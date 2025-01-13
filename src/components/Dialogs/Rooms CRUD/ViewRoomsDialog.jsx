import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { indexBookings } from "../../../api/booking";
import { retrieveRooms } from "../../../api/room";
import { getUsers } from "../../../api/user";
import { getSubjects } from "../../../api/subject";
import { getSections } from "../../../api/section";

export default function ViewRoomsDialog({
  openViewRoomsDialog,
  setOpenViewRoomsDialog,
  rowRoomTypes,
}) {
  const [cookies] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);
  const [rooms, setRooms] = useState([]);

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
  };

  useEffect(() => {
    if (openViewRoomsDialog) {
      retrieve();
    }
  }, [openViewRoomsDialog]);

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
      {openViewRoomsDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-4xl overflow-y-auto max-h-[80vh] mt-20 shadow-xl">
            <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <h2 className="text-lg font-semibold">
                Viewing Room - {openViewRoomsDialog?.room_name}
              </h2>
              <button
                onClick={() => setOpenViewRoomsDialog(null)}
                className="text-white hover:text-red-400 transition-transform transform hover:scale-110"
              >
                X
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-4 px-6 py-4">
              <div className="w-full md:w-1/2 border border-gray-300 rounded-lg overflow-hidden">
                <img
                  src={openViewRoomsDialog?.image}
                  alt={openViewRoomsDialog?.image}
                  className="w-full h-60 object-contain rounded-lg shadow-md"
                />
              </div>

              <div className="flex-1 text-sm sm:text-base">
                <h3 className="font-semibold text-blue-700 mb-2">
                  {
                    rowRoomTypes?.find(
                      (r) => r.id === openViewRoomsDialog?.room_type_id
                    )?.room_type
                  }
                </h3>
                <p className="text-gray-700">
                  {openViewRoomsDialog?.description}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[40vh] m-2">
              <table className="min-w-full table-auto border-collapse text-xs sm:text-base">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="text-center p-2 border">Created By</th>
                    <th className="text-center p-2 border">Created At</th>
                    <th className="text-center p-2 border">Room Name</th>
                    <th className="text-center p-2 border">Subject</th>
                    <th className="text-center p-2 border">Sections</th>
                    <th className="text-center p-2 border">Time</th>
                    <th className="text-center p-2 border">Days Of Week</th>
                    <th className="text-center p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows
                    .filter(
                      (row) =>
                        rooms.find((s) => s.id === row.room_id)?.room_name ===
                        openViewRoomsDialog?.room_name
                    )
                    .reverse()
                    .map((row) => (
                      <tr key={row.id} className="hover:bg-gray-100">
                        <td className="text-left text-[7px] border border-grey p-0 sm:text-base">
                          {row.users?.name || ""}
                        </td>
                        <td className="text-left text-[7px] border border-grey p-0 sm:text-base">
                          {formatDateTime(row.created_at)}
                        </td>
                        <td className="text-left text-[7px] border border-grey p-0 sm:text-base">
                          {row.rooms?.room_name || ""}
                        </td>
                        <td className="text-right text-[7px] border border-grey p-0 sm:text-base">
                          {row.subjects?.subject_name || ""}
                        </td>
                        <td className="text-center text-[7px] border border-grey p-0 sm:text-base">
                          {row.sections?.section_name || ""}
                        </td>
                        <td className="text-center text-[7px] border border-grey p-0 sm:text-base">
                          {formatTime(row.start_time)} -{" "}
                          {formatTime(row.end_time)}
                        </td>
                        <td className="text-center text-[7px] border border-grey p-0 sm:text-base">
                          {row.day_of_week}
                        </td>
                        <td className="text-center text-[7px] border border-grey p-0 sm:text-base">
                          {row.status}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
