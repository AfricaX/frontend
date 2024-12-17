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
                          {users.find((u) => u.id === row.user_id)?.name || ""}
                        </td>
                        <td className="text-left text-[7px] border border-grey p-0 sm:text-base">
                          {row.created_at.slice(0, 10) +
                            " " +
                            row.created_at.slice(11, 16)}
                        </td>
                        <td className="text-left text-[7px] border border-grey p-0 sm:text-base">
                          {rooms.find((r) => r.id === row.room_id)?.room_name ||
                            ""}
                        </td>
                        <td className="text-right text-[7px] border border-grey p-0 sm:text-base">
                          {subject.find((s) => s.id === row.subject_id)
                            ?.subject_name || ""}
                        </td>
                        <td className="text-center text-[7px] border border-grey p-0 sm:text-base">
                          {sections.find((s) => s.id === row.section_id)
                            ?.section_name || ""}
                        </td>
                        <td className="text-center text-[7px] border border-grey p-0 sm:text-base">
                          {row.start_time} - {row.end_time}
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
