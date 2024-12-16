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

    retrieveRooms(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setRooms(response.data);
      }
    });

    getUsers(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setUsers(response.data);
      }
    });

    getSubjects(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setSubject(response.data);
      }
    });

    getSections(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setSections(response.data);
      }
    });
  };

  useEffect(() => {
    retrieve();
  }, []);

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
                      <td className="text-left text-[7px] border border-black p-0 sm:text-base">
                        {users.find((u) => u.id === row.user_id)?.name ?? ""}
                      </td>
                      <td className="text-left text-[7px] border border-black p-0 sm:text-base">
                        {row.created_at.slice(0, 10) +
                          " " +
                          row.created_at.slice(11, 16)}
                      </td>
                      <td className="text-left text-[7px] border border-black p-0 sm:text-base">
                        {rooms.find((r) => r.id === row.room_id)?.room_name ||
                          ""}
                      </td>
                      <td className="text-left text-[7px] border border-black p-0 sm:text-base">
                        {subject.find((s) => s.id === row.subject_id)
                          ?.subject_name ?? ""}
                      </td>
                      <td className="text-left text-[7px] border border-black p-0 sm:text-base">
                        {sections.find((s) => s.id === row.section_id)
                          ?.section_name ?? ""}
                      </td>
                      <td className="text-left text-[7px] border border-black p-0 sm:text-base">
                        {row.start_time} - {row.end_time}
                      </td>
                      <td className="text-left text-[7px] border border-black p-0 sm:text-base">
                        {row.day_of_week}
                      </td>
                      <td className="text-left text-[7px] border border-black p-0 sm:text-base">
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
