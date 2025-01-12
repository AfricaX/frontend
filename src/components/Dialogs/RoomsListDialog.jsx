import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Slide,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { retrieveRooms, showRoom } from "../../api/room";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRoomsDialog from "../Dialogs/Rooms CRUD/CreateRoomsDialog";
import ViewRoomsDialog from "../Dialogs/Rooms CRUD/ViewRoomsDialog";
import EditRoomsDialog from "../Dialogs/Rooms CRUD/EditRoomsDialog";
import DeleteRoomsDialog from "../Dialogs/Rooms CRUD/DeleteRoomsDialog";
import { retrieveRoomTypes } from "../../api/roomtype";
import { useSelector } from "react-redux";

export default function RoomsListDialog({
  openRoomsListDialog,
  setOpenRoomsListDialog,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);

  /**
   * retrieve Rooms
   */
  const retrieve = () => {
    retrieveRooms(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setRows(response.data);
      }
    });
  };

  /**
   * Retrieve Room Types
   */
  const [rowRoomTypes, setRowRoomTypes] = useState([]);
  const getRoomTypes = () => {
    retrieveRoomTypes(cookies.AUTH_TOKEN).then((response) => {
      setRowRoomTypes(response.data);
    });
  };


  useEffect(() => {
    if (openRoomsListDialog) {
      getRoomTypes();
      retrieve();
    }
  }, [openRoomsListDialog]);

  /**
   * CreateRoomsDialog
   */
  const [openCreateRooms, setOpenCreateRooms] = useState(false);

  const handleOpenCreateRooms = () => {
    setOpenCreateRooms(true);
  };

  /**
   * View Rooms Dialog
   */
  const [openViewRoomsDialog, setOpenViewRoomsDialog] = useState(null);

  const handleOpenViewRoomsDialog = (row) => {
    setOpenViewRoomsDialog(row);
  };
  const user = useSelector((state) => state.auth.user);
  /**
   * Edit Rooms Dialog
   */
  const [openEditRoomsDialog, setOpenEditRoomsDialog] = useState(null);

  const handleOpenEditRoomsDialog = (row) => {
    setOpenEditRoomsDialog(row);
  };

  /**
   * Delete Rooms Dialog
   */
  const [openDeleteRoomsDialog, setOpenDeleteRoomsDialog] = useState(null);

  const handleOpenDeleteRoomsDialog = (row) => {
    setOpenDeleteRoomsDialog(row);
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 transition-opacity duration-300 ${
          openRoomsListDialog ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-auto">
          <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <h2 className="text-2xl font-semibold tracking-wide">
              List Of Sections
            </h2>
            <button
              className="text-white hover:text-red-400 transition-transform transform hover:scale-110"
              onClick={() => setOpenRoomsListDialog(false)}
            >
              X {/* Close Button */}
            </button>
          </div>

          <div className="flex justify-end px-6 py-3">
            <button
              onClick={handleOpenCreateRooms}
              className="px-5 py-2 rounded-lg bg-green-500 text-white font-medium shadow-md hover:bg-green-600 hover:shadow-lg transform transition-all duration-200"
            >
              + Create Section
            </button>
          </div>

          <Box className="overflow-auto px-6 pb-6">
            <CreateRoomsDialog
              rowRoomTypes={rowRoomTypes}
              retrieve={retrieve}
              openCreateRooms={openCreateRooms}
              setOpenCreateRooms={setOpenCreateRooms}
            />
            <ViewRoomsDialog
              rowRoomTypes={rowRoomTypes}
              openViewRoomsDialog={openViewRoomsDialog}
              setOpenViewRoomsDialog={setOpenViewRoomsDialog}
            />
            <EditRoomsDialog
              retrieve={retrieve}
              rowRoomTypes={rowRoomTypes}
              openEditRoomsDialog={openEditRoomsDialog}
              setOpenEditRoomsDialog={setOpenEditRoomsDialog}
            />
            <DeleteRoomsDialog
              retrieve={retrieve}
              openDeleteRoomsDialog={openDeleteRoomsDialog}
              setOpenDeleteRoomsDialog={setOpenDeleteRoomsDialog}
            />
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-[8px] md:text-[16px] border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border text-center">Room ID</th>
                    <th className="border text-center">Room Name</th>
                    <th className="border p-1 text-center">Room Type</th>
                    <th className="border p-1 text-center">Location</th>
                    <th className="border p-1 text-center">Description</th>
                    <th className="border text-center">Capacity</th>
                    {user?.role === "admin" ? (
                      <th className="border p-1 text-center">Actions</th>
                    ):null}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="border  text-center">{row.id}</td>
                      <td className="border p-1 text-center">
                        {row.room_name}
                      </td>
                      <td className="border text-center">
                        {rowRoomTypes.find((r) => r.id === row.room_type_id)
                          ?.room_type || " "}
                      </td>
                      <td className="border p-1 text-center">{row.location}</td>
                      <td className="border p-1 text-center">
                        {row.description}
                      </td>
                      <td className="border text-center">{row.capacity}</td>
                      <td className="border p-1 text-center">
                        {user?.role === "admin" ? (
                          <Box className="flex justify-around">
                          <VisibilityIcon
                            aria-label="View Room"
                            onClick={() => handleOpenViewRoomsDialog(row)}
                            fontSize="small"
                          />
                          <EditIcon
                            aria-label="Edit Room"
                            onClick={() => handleOpenEditRoomsDialog(row)}
                            fontSize="small"
                          />
                          <DeleteIcon
                            aria-label="Delete Room"
                            onClick={() => handleOpenDeleteRoomsDialog(row)}
                            fontSize="small"
                          />
                        </Box>
                        ):null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}
