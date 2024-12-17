import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCookies } from "react-cookie";
import { indexBookings } from "../../api/booking";
import { retrieveRooms } from "../../api/room";
import { getUsers } from "../../api/user";
import { getSubjects } from "../../api/subject";
import { getSections } from "../../api/section";
import CreateBookingsDialog from "./Bookings CRUD/CreateBookingsDialog";
import EditBookingsDialog from "./Bookings CRUD/EditBookingsDialog";
import DeleteBookingsDialog from "./Bookings CRUD/DeleteBookingsDialog";

export default function BookingListDialog({
  openBookingListDialog,
  setOpenBookingListDialog,
}) {
  const [cookies] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
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
        setSubjects(response.data);
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

  const [openCreateBookingsDialog, setOpenCreateBookingsDialog] =
    useState(false);
  const [openEditBookingsDialog, setOpenEditBookingsDialog] = useState(null);
  const [openDeleteBookingsDialog, setOpenDeleteBookingsDialog] =
    useState(null);

  const handleOpenCreateBookingsDialog = () => {
    setOpenCreateBookingsDialog(true);
  };

  const handleOpenEditBookingsDialog = (row) => {
    setOpenEditBookingsDialog(row);
  };

  const handleOpenDeleteBookingsDialog = (row) => {
    setOpenDeleteBookingsDialog(row);
  };

  return (
    <>
      <div
        className={`${
          openBookingListDialog ? "block" : "hidden"
        } fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center`}
      >
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 md:scale-100">
          <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-2xl font-semibold tracking-wide">
              List of Class Scheduled
            </h2>
            <button
              className="text-white hover:text-red-400 transition-transform transform hover:scale-110"
              onClick={() => setOpenBookingListDialog(false)}
            >
              X
            </button>
          </div>

          <div className="flex justify-between items-center mb-4 m-5">
            <div className="flex">
              <input
                type="text"
                className="px-4 py-2 border border-gray-300 rounded-md text-[8px] sm:text-base"
                placeholder="Search..."
              />
              <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md text-[8px] sm:text-base">
                Search
              </button>
            </div>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md text-[8px] sm:text-base"
              onClick={handleOpenCreateBookingsDialog}
            >
              Create booking
            </button>
          </div>

          <div className="overflow-x-auto mt-4 max-h-[50vh] m-2">
            <table className="min-w-full table-auto border-collapse text-[8px] lg:text-[15px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-grey text-[8px] sm:text-base">
                    Created By
                  </th>
                  <th className="border border-grey text-[8px] sm:text-base">
                    Created At
                  </th>
                  <th className="border border-grey text-[8px] sm:text-base">
                    Room Name
                  </th>
                  <th className="border border-grey text-[8px] sm:text-base text-center">
                    Subject
                  </th>
                  <th className="border border-grey text-[8px] sm:text-base text-center">
                    Time
                  </th>
                  <th className="border border-grey text-[8px] sm:text-base text-center">
                    Days Of Week
                  </th>
                  <th className="border border-grey text-[8px] sm:text-base text-center">
                    Status
                  </th>
                  <th className="border border-grey text-[8px] sm:text-base text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .slice()
                  .reverse()
                  .map((row) => (
                    <tr key={row.id} className="border-b">
                      <td className="border border-grey text-[8px] sm:text-base">
                        {users.filter((u) => u.id === row.user_id)[0]?.name ??
                          ""}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base">
                        {row.created_at.slice(0, 10) +
                          " " +
                          row.created_at.slice(11, 16)}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base">
                        {rooms.filter((r) => r.id === row.room_id)[0]
                          ?.room_name || ""}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base text-center">
                        {subjects.filter((s) => s.id === row.subject_id)[0]
                          ?.subject_name ?? ""}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base text-center">
                        {row.start_time} - {row.end_time}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base text-center">
                        {row.day_of_week}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base text-center">
                        {row.status}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base text-center">
                        <div className="flex justify-center space-x-4">
                          <EditIcon
                            className="text-blue-500 cursor-pointer text-[8px] sm:text-base"
                            onClick={() => handleOpenEditBookingsDialog(row)}
                          />
                          <DeleteIcon
                            className="text-red-500 cursor-pointer text-[8px] sm:text-base"
                            onClick={() => handleOpenDeleteBookingsDialog(row)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <CreateBookingsDialog
            rooms={rooms}
            sections={sections}
            subjects={subjects}
            retrieve={retrieve}
            openCreateBookingsDialog={openCreateBookingsDialog}
            setOpenCreateBookingsDialog={setOpenCreateBookingsDialog}
          />

          <EditBookingsDialog
            rooms={rooms}
            sections={sections}
            subjects={subjects}
            retrieve={retrieve}
            openEditBookingsDialog={openEditBookingsDialog}
            setOpenEditBookingsDialog={setOpenEditBookingsDialog}
          />

          <DeleteBookingsDialog
            retrieve={retrieve}
            openDeleteBookingsDialog={openDeleteBookingsDialog}
            setOpenDeleteBookingsDialog={setOpenDeleteBookingsDialog}
          />
        </div>
      </div>
    </>
  );
}
