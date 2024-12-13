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
      console.log(response.data);
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
    console.log(row);
  };

  /**
   * Edit Rooms Dialog
   */

  const [openEditRoomsDialog, setOpenEditRoomsDialog] = useState(null);

  const handleOpenEditRoomsDialog = (row) => {
    setOpenEditRoomsDialog(row);
    console.log(row);
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
        sx={{ margin: "50px" }}
      >
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#2f3a8f",
                      textAlign: "left",
                      margin: "10px 0px 0px 10px",
                    }}
                  >
                    List Of Rooms
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setOpenRoomsListDialog(false)}
                  >
                    X
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpenCreateRooms}
                >
                  Create Room
                </Button>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  overflow: "auto",
                  marginTop: "10px",
                  border: "1px solid black",
                }}
              >
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
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 50 }} aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{ background: "lightgrey" }}>
                        <TableCell align="center"> Room ID </TableCell>
                        <TableCell align="center"> Room Name </TableCell>
                        <TableCell align="center"> Room Type </TableCell>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Capacity</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell align="center">
                            {" "}
                            {row.room_name}{" "}
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            {rowRoomTypes.filter(
                              (r) => r.id == row.room_type_id
                            )[0]?.room_type ?? " "}
                          </TableCell>
                          <TableCell align="center">{row.location}</TableCell>
                          <TableCell align="center">
                            {" "}
                            {row.description}
                          </TableCell>
                          <TableCell align="center"> {row.capacity}</TableCell>
                          <TableCell align="center">
                            <Box display={"flex"}>
                              <VisibilityIcon
                                aria-label="View Room"
                                sx={{ flex: 1 }}
                                onClick={() => handleOpenViewRoomsDialog(row)}
                                cursor={"pointer"}
                              />{" "}
                              <EditIcon
                                aria-label="Edit Room"
                                sx={{ flex: 1 }}
                                onClick={() => handleOpenEditRoomsDialog(row)}
                                cursor={"pointer"}
                              />
                              <DeleteIcon
                                aria-label="Delete Room"
                                sx={{ flex: 1 }}
                                onClick={() => handleOpenDeleteRoomsDialog(row)}
                                cursor={"pointer"}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
