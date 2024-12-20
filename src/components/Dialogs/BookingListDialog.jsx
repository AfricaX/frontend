import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCookies } from "react-cookie";
import { indexBookings } from "../../api/booking";
import { retrieveRooms } from "../../api/room";
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
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);

  const retrieve = () => {
    indexBookings(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setRows(response.data);
        console.log(response.data);
      }
    });

    retrieveRooms(cookies.AUTH_TOKEN).then((response) => {
      if (response?.data) {
        setRooms(response.data);
      }
    });

    getSubjects(cookies.AUTH_TOKEN).then((response) => {
      if (response?.data) {
        setSubjects(response.data);
      }
    });

    getSections(cookies.AUTH_TOKEN).then((response) => {
      if (response?.data) {
        setSections(response.data);
      }
    });
  };

  useEffect(() => {
    if (openBookingListDialog) {
      retrieve();
    }
  }, [openBookingListDialog]);

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

  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredRows(rows);
    } else {
      const filtered = rows.filter((row) => {
        const roomName = row.rooms?.room_name?.toLowerCase();
        const subjectName = row.subjects?.subject_name?.toLowerCase();
        const sectionName = row.sections?.section_name?.toLowerCase();
        const status = row.status?.toLowerCase();
        const day = row.day_of_week?.toLowerCase();

        return (
          roomName?.includes(searchQuery.toLowerCase()) ||
          subjectName?.includes(searchQuery.toLowerCase()) ||
          sectionName?.includes(searchQuery.toLowerCase()) ||
          status?.includes(searchQuery.toLowerCase()) ||
          day?.includes(searchQuery.toLowerCase())
        );
      });

      setFilteredRows(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredRows(rows);
  };

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);
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
                value={searchQuery || ""}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md text-[8px] sm:text-base"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="ml-2 px-4 py-2 bg-gray-300 text-black rounded-md text-[8px] sm:text-base"
                onClick={handleClearSearch}
              >
                Reset
              </button>
            </div>

            <button
              className="px-5 py-2 rounded-lg bg-green-500 text-white font-medium md text-[10px] sm:text-base shadow-md hover:bg-green-600 hover:shadow-lg transform transition-all duration-200 "
              onClick={handleOpenCreateBookingsDialog}
            >
              {" "}
              + Create booking
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
                    Section
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
                {filteredRows
                  .slice()
                  .reverse()
                  .map((row) => (
                    <tr key={row.id} className="border-b">
                      <td className="border border-grey text-[8px] sm:text-base">
                        {row.users?.name ?? ""}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base">
                        {formatDateTime(row.created_at)}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base">
                        {row.rooms?.room_name ?? ""}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base text-center">
                        {row.sections?.section_name ?? ""}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base text-center">
                        {row.subjects?.subject_name ?? ""}
                      </td>
                      <td className="border border-grey text-[8px] sm:text-base text-center">
                        {formatTime(row.start_time)} -{" "}
                        {formatTime(row.end_time)}
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
            retrieve={retrieve}
            openCreateBookingsDialog={openCreateBookingsDialog}
            setOpenCreateBookingsDialog={setOpenCreateBookingsDialog}
            rooms={rooms}
            subjects={subjects}
            sections={sections}
          />

          <EditBookingsDialog
            retrieve={retrieve}
            openEditBookingsDialog={openEditBookingsDialog}
            setOpenEditBookingsDialog={setOpenEditBookingsDialog}
            rooms={rooms}
            subjects={subjects}
            sections={sections}
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
