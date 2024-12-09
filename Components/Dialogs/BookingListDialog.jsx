import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import {
  Box,
  Button,
  DialogActions,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateBookingsDialog from "./Bookings CRUD/CreateBookingsDialog";

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
    <>
      <Dialog open={!!openBookingListDialog} fullScreen sx={{ margin: "50px" }}>
        <DialogContent>
          <Box sx={{ margin: "10px" }}>
            <Box sx={{ display: "flex " }}>
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
              <Box sx={{ position: "absolute", right: "10px", top: "10px" }}>
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
            <Box sx={{ display: "grid ", gridTemplateColumns: "1fr 1fr" }}>
              <Box>
                <TextField></TextField>
                <Button variant="contained" sx={{ margin: "10px" }}>
                  Search
                </Button>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  sx={{ margin: "10px" }}
                  color="success"
                >
                  Create booking
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                width: "94.5%",
                maxHeight: "375px",
                overflow: "auto",
                marginRight: "20px",
                marginTop: "20px",
                border: "1px solid black",
                position: "absolute",
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ background: "lightgrey" }}>
                      <TableCell> Created By </TableCell>
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
                          <TableCell>
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
                            {subject.filter((s) => s.id === row.subject_id)[0]
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
                                onClick={() => handleOpenEditRoomsDialog(row)}
                                cursor={"pointer"}
                              />
                              <DeleteIcon
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
          <CreateBookingsDialog/>
        </DialogContent>
      </Dialog>
    </>
  );
}
