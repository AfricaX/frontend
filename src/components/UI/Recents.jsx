import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { indexBookings } from "../../api/booking";

export default function Recents() {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);
  const tableRef = useRef(null);

  const retrieve = () => {
    indexBookings(cookies.AUTH_TOKEN).then((response) => {
      if (response?.data) {
        setRows(response.data);
      }
    });
  };

  useEffect(() => {
    retrieve();
  }, []);

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
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="flex justify-center align-center ">
      <div className="overflow-x-auto">
        <div className="text-2xl font-bold text-[#2f3a8f] mb-4">
          Recent Class Scheduled
        </div>
        <div
          className="overflow-x-auto max-w-full scrollbar-hide"
          ref={tableRef}
        >
          <table className="min-w-full table-auto border border-black p-1 text-[8px] lg:text-[15px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-black p-1">Created By</th>
                <th className="border border-black text-center p-1">
                  Created At
                </th>
                <th className="border border-black text-center p-1">
                  Room Name
                </th>
                <th className="border border-black p-1 text-center">Subject</th>
                <th className="border border-black p-1 text-center">Time</th>
                <th className="border border-black p-1 text-center">
                  Days Of Week
                </th>
                <th className="border border-black p-1 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice().reverse().map((row) => (
                <tr key={row.id}>
                  <td className="border border-black p-1">
                    {row?.users?.name || ""}
                  </td>
                  <td className="border border-black p-1">
                    {formatDateTime(row.created_at)}
                  </td>
                  <td className="border border-black p-1">
                    {row.rooms?.room_name || ""}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.subjects?.subject_name || ""}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {formatTime(row.start_time)} - {formatTime(row.end_time)}
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
    </div>
  );
}
