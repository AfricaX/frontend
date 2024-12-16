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
          <div className="bg-white rounded-lg w-full max-w-4xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center m-4">
              <h2 className="text-2xl font-bold text-blue-700 text-xs sm:text-base">
                Viewing Room - {openViewRoomsDialog?.room_name}
              </h2>
              <button
                onClick={() => setOpenViewRoomsDialog(null)}
                className="border-2 border-red-500 text-red-500 text-2xl sm:text-xl px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
              >
                X
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6 mb-4">
              <div className="w-full md:w-1/2 border border-gray-300 m-0 md:m-5">
                <img
                  src={openViewRoomsDialog?.image}
                  alt={openViewRoomsDialog?.image}
                  className="w-full h-60 object-contain"
                />
              </div>

              <div className="flex-1 text-xs sm:text-base m-5">
                <h3 className="font-semibold text-blue-700">
                  {
                    rowRoomTypes?.find(
                      (r) => r.id === openViewRoomsDialog?.room_type_id
                    )?.room_type
                  }
                </h3>
                <p>{openViewRoomsDialog?.description}</p>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[40vh] m-2">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="text-left text-[7px] border border-black p-0 sm:text-base">
                      Created By
                    </th>
                    <th className="text-left text-[7px] border border-black p-0 sm:text-base">
                      Created At
                    </th>
                    <th className="text-left text-[7px] border border-black p-0 sm:text-base">
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
                        rooms.find((s) => s.id === row.room_id)?.room_name ===
                        openViewRoomsDialog?.room_name
                    )
                    .reverse()
                    .map((row) => (
                      <tr key={row.id} className="hover:bg-gray-100">
                        <td className="text-left text-[7px] border border-black p-0 sm:text-base">
                          {users.find((u) => u.id === row.user_id)?.name || ""}
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
                        <td className="text-right text-[7px] border border-black p-0 sm:text-base">
                          {subject.find((s) => s.id === row.subject_id)
                            ?.subject_name || ""}
                        </td>
                        <td className="text-center text-[7px] border border-black p-0 sm:text-base">
                          {sections.find((s) => s.id === row.section_id)
                            ?.section_name || ""}
                        </td>
                        <td className="text-center text-[7px] border border-black p-0 sm:text-base">
                          {row.start_time} - {row.end_time}
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
      )}
    </>
  );
}
