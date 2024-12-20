import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { indexBookings } from "../../../api/booking";
import { retrieveRooms } from "../../../api/room";
import { getUsers } from "../../../api/user";
import { getSubjects } from "../../../api/subject";
import { getSections } from "../../../api/section";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ({
  openViewSectionsDialog,
  setOpenViewSectionsDialog,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [subject, setSubject] = useState([]);
  const [sections, setSections] = useState([]);

  const retrieve = () => {
    indexBookings(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setRows(response.data);
      }
    });

    getSections(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setSections(response.data);
      }
    });
  };

  useEffect(() => {
    if (openViewSectionsDialog) {
      retrieve();
    }
  }, [openViewSectionsDialog]);

  /**
   * Date Formatter
   */
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toISOString().split("T")[0];
    const formattedTime = date.toLocaleTimeString([], options);

    return `${formattedDate} ${formattedTime}`;
  };

  /**
   * Time Formatter
   */
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12; // Convert 0 and 12 to 12
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <>
      <div
        className={`${
          openViewSectionsDialog ? "block" : "hidden"
        } fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center`}
      >
        <div className="w-full max-w-5xl bg-white p-6 rounded-md shadow-lg mt-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[1rem] sm:text-2xl font-bold text-[#2f3a8f]">
              Viewing Scheduled Classes For{" "}
              {openViewSectionsDialog?.section_name}
            </h2>
            <button
              className="border-2 border-red-500 text-red-500 text-2xl sm:text-xl px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
              onClick={() => setOpenViewSectionsDialog(null)}
            >
              X
            </button>
          </div>

          <div className="overflow-x-auto max-h-[40vh] m-2">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-center text-[7px] border border-black p-0 sm:text-base">
                    Created By
                  </th>
                  <th className="text-center text-[7px] border border-black p-0 sm:text-base">
                    Created At
                  </th>
                  <th className="text-center text-[7px] border border-black p-0 sm:text-base">
                    Room Name
                  </th>
                  <th className="text-center text-[7px] border border-black p-0 sm:text-base">
                    Subject
                  </th>
                  <th className="text-center text-[7px] border border-black p-0 sm:text-base">
                    Sections
                  </th>
                  <th className="text-center text-[7px] border border-black p-0 sm:text-base">
                    Time
                  </th>
                  <th className="text-center text-[7px] border border-black p-0 sm:text-base">
                    Days Of Week
                  </th>
                  <th className="text-center text-[7px] border border-black p-0 sm:text-base">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter(
                    (row) =>
                      sections.find((s) => s.id === row.section_id)
                        ?.section_name === openViewSectionsDialog?.section_name
                  )
                  .slice()
                  .reverse()
                  .map((row) => (
                    <tr key={row.id} className="hover:bg-gray-100">
                      <td className="text-center text-[7px] border border-black p-0 sm:text-base">
                        {row.users?.name ?? ""}
                      </td>
                      <td className="text-center text-[7px] border border-black p-0 sm:text-base">
                        {formatDateTime(row.created_at)}
                      </td>
                      <td className="text-center text-[7px] border border-black p-0 sm:text-base">
                        {row.rooms?.room_name ?? ""}
                      </td>
                      <td className="text-center text-[7px] border border-black p-0 sm:text-base">
                        {row.subjects?.subject_name ?? ""}
                      </td>
                      <td className="text-center text-[7px] border border-black p-0 sm:text-base">
                        {row.sections?.section_name ?? ""}
                      </td>
                      <td className="text-center text-[7px] border border-black p-0 sm:text-base">
                        {formatTime(row.start_time)} -{" "}
                        {formatTime(row.end_time)}
                      </td>
                      <td className="text-center text-[7px] border border-black p-0 sm:text-base">
                        {row.day_of_week}
                      </td>
                      <td className="text-center text-[7px] border border-black p-0 sm:text-base">
                        {row.status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
