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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    getRoomTypes();
    retrieve();
  }, []);

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
      <Dialog
        open={openRoomsListDialog}
        TransitionComponent={Transition}
        fullScreen
        sx={{
          margin: "50px",
          "& .MuiDialogContent-root": {
            padding: "0",
          },
        }}
      >
        <DialogContent>
          <Box className="w-full px-4 md:px-8">
            <Box className="mb-4">
              <Box className="flex justify-between items-center">
                <Typography className="text-xs md:text-sm font-bold text-[#2f3a8f]">
                  List of Rooms
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setOpenRoomsListDialog(false)}
                  className="md:text-xs"
                >
                  X
                </Button>
              </Box>

              <Box className="flex justify-end mt-4">
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpenCreateRooms}
                  className="md:text-xs"
                >
                  Create Room
                </Button>
              </Box>

              <Box className="overflow-x-auto mt-4">
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
                        <th className="border p-1 text-center">Actions</th>
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
                          <td className="border p-1 text-center">
                            {row.location}
                          </td>
                          <td className="border p-1 text-center">
                            {row.description}
                          </td>
                          <td className="border text-center">{row.capacity}</td>
                          <td className="border p-1 text-center">
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
