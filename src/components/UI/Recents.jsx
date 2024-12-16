import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { indexBookings } from "../../api/booking";
import { retrieveRooms } from "../../api/room";
import { getUsers } from "../../api/user";
import { getSubjects } from "../../api/subject";

export default function Recents() {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [subject, setSubject] = useState([]);

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
  };

  useEffect(() => {
    retrieve();
  }, []);

  return (
    <div className="flex justify-center align-center ">
      <div className="overflow-x-auto">
        <div className="text-2xl font-bold text-[#2f3a8f] mb-4">
          Recent Class Scheduled
        </div>
        <table className="min-w-full table-auto border border-black p-1 text-[8px] lg:text-[15px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-black p-1">Created By</th>
              <th className="border border-black text-center p-1">
                Created At
              </th>
              <th className="border border-black text-center p-1">Room Name</th>
              <th className="border border-black p-1 text-center">Subject</th>
              <th className="border border-black p-1 text-center">Time</th>
              <th className="border border-black p-1 text-center">
                Days Of Week
              </th>
              <th className="border border-black p-1 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .slice()
              .reverse()
              .map((row) => (
                <tr key={row.id}>
                  <td className="border border-black p-1">
                    {users.find((u) => u.id === row.user_id)?.name ?? ""}
                  </td>
                  <td className="border border-black p-1">
                    {row.created_at.slice(0, 10) +
                      " " +
                      row.created_at.slice(11, 16)}
                  </td>
                  <td className="border border-black p-1">
                    {rooms.find((r) => r.id === row.room_id)?.room_name || ""}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {subject.find((s) => s.id === row.subject_id)
                      ?.subject_name ?? ""}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.start_time} - {row.end_time}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.day_of_week}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
