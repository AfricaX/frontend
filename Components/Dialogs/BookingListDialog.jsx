import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { indexBookings } from "../../api/booking";
import { retrieveRooms } from "../../api/room";
import { getUsers } from "../../api/user";
import { getSubjects } from "../../api/subject";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateBookingsDialog from "./Bookings CRUD/CreateBookingsDialog";
import { getSections } from "../../api/section";
import EditBookingsDialog from "./Bookings CRUD/EditBookingsDialog";
import DeleteBookingsDialog from "./Bookings CRUD/DeleteBookingsDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BookingListDialog({
  openBookingListDialog,
  setOpenBookingListDialog,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
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

  /**
   * Create New Bookings
   */

  const [openCreateBookingsDialog, setOpenCreateBookingsDialog] =
    useState(false);

  const handleOpenCreateBookingsDialog = () => {
    setOpenCreateBookingsDialog(true);
  };

  /**
   * Edit Bookings
   */

  const [openEditBookingsDialog, setOpenEditBookingsDialog] = useState(null);

  const handleOpenEditBookingsDialog = (row) => {
    setOpenEditBookingsDialog(row);
  };

  /**
   * Delete Bookings
   */

  const [openDeleteBookingsDialog, setOpenDeleteBookingsDialog] =
    useState(null);

  const handleOpenDeleteBookingsDialog = (row) => {
    setOpenDeleteBookingsDialog(row);
  };

  return (
    <>
      <Dialog open={!!openBookingListDialog} fullScreen sx={{ margin: "50px" }}>
        <DialogContent>
          <Box sx={{ margin: "10px" }}>
            <Box sx={{ display: "flex ", justifyContent: "space-between" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#2f3a8f",
                    textAlign: "left",
                    margin: "10px 10px 10px 10px",
                  }}
                >
                  List of Class Scheduled
                </Typography>
              </Box>
              <Box>
                <Button
                  onClick={() => setOpenBookingListDialog(false)}
                  variant="outlined"
                  color="error"
                >
                  {" "}
                  X
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <TextField></TextField>
                <Button variant="contained" sx={{ margin: "10px" }}>
                  Search
                </Button>
              </Box>

              <Box>
                <Button
                  variant="contained"
                  sx={{ margin: "10px" }}
                  color="success"
                  onClick={handleOpenCreateBookingsDialog}
                >
                  Create booking
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
                marginTop: "20px",
              }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  maxHeight: "350px",
                  overflow: "auto",
                  border: "1px solid black",
                }}
              >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ background: "lightgrey" }}>
                      <TableCell sx={{ maxWidth: "50px" }}>
                        {" "}
                        Created By{" "}
                      </TableCell>
                      <TableCell> Created At </TableCell>
                      <TableCell> Room Name</TableCell>
                      <TableCell align="right">Subject</TableCell>
                      <TableCell align="right">Time</TableCell>
                      <TableCell align="right">Days Of Week</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice()
                      .reverse()
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            sx={{ maxWidth: "50px", wordWrap: "break-word" }}
                          >
                            {users.filter((u) => u.id === row.user_id)[0]
                              ?.name ?? ""}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.created_at.slice(0, 10) +
                              " " +
                              row.created_at.slice(11, 16)}
                          </TableCell>
                          <TableCell>
                            {rooms.filter((r) => r.id === row.room_id)[0]
                              ?.room_name || ""}
                          </TableCell>
                          <TableCell align="right">
                            {subjects.filter((s) => s.id === row.subject_id)[0]
                              ?.subject_name ?? ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.start_time} - {row.end_time}
                          </TableCell>
                          <TableCell align="right">{row.day_of_week}</TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                          <TableCell align="center">
                            <Box display={"flex"}>
                              <EditIcon
                                sx={{ flex: 1 }}
                                onClick={() =>
                                  handleOpenEditBookingsDialog(row)
                                }
                                cursor={"pointer"}
                              />
                              <DeleteIcon
                                sx={{ flex: 1 }}
                                onClick={() =>
                                  handleOpenDeleteBookingsDialog(row)
                                }
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
        </DialogContent>
      </Dialog>
    </>
  );
}
