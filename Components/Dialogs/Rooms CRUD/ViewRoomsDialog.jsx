import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Container,
  Typography,
  TableContainer,
  Paper,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Recents from "../../UI/Recents";
import { useCookies } from "react-cookie";
import { indexBookings } from "../../../api/booking";
import { retrieveRooms } from "../../../api/room";
import { getUsers } from "../../../api/user";
import { getSubjects } from "../../../api/subject";
import { getSections } from "../../../api/section";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewRoomsDialog({
  openViewRoomsDialog,
  setOpenViewRoomsDialog,
  rowRoomTypes,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
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
      <Dialog
        open={!!openViewRoomsDialog}
        TransitionComponent={Slide}
        fullScreen
        sx={{ margin: "50px" }}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#2f3a8f",
                    textAlign: "left",
                    margin: "10px",
                  }}
                >
                  Viewing Room - {openViewRoomsDialog?.room_name}
                </Typography>
              </Box>
              <Box>
                <Button
                  onClick={() => setOpenViewRoomsDialog(null)}
                  variant="outlined"
                  color="error"
                >
                  X
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", md: "50%" },
                  border: "1px solid black",
                }}
              >
                <img
                  src="src/assets/logo.png"
                  alt="Logo"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#2f3a8f",
                    }}
                  >
                    {
                      rowRoomTypes?.find(
                        (r) => r.id === openViewRoomsDialog?.room_type_id
                      )?.room_type
                    }
                  </Typography>
                </Box>

                <Box>
                  <Typography>{openViewRoomsDialog?.description}</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ marginTop: "20px" }}>
              <TableContainer component={Paper}>
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
                      <TableCell align="right"> Sections</TableCell>
                      <TableCell align="right">Time</TableCell>
                      <TableCell align="right">Days Of Week</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .filter(
                        (row) =>
                          rooms.find((s) => s.id === row.room_id)?.room_name ===
                          openViewRoomsDialog?.room_name
                      )
                      .slice()
                      .reverse()
                      .map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell sx={{ maxWidth: "50px" , wordWrap: "break-word" }}>
                            {users.find((u) => u.id === row.user_id)?.name ??
                              ""}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.created_at.slice(0, 10) +
                              " " +
                              row.created_at.slice(11, 16)}
                          </TableCell>
                          <TableCell>
                            {rooms.find((r) => r.id === row.room_id)
                              ?.room_name || ""}
                          </TableCell>
                          <TableCell align="right">
                            {subject.find((s) => s.id === row.subject_id)
                              ?.subject_name ?? ""}
                          </TableCell>
                          <TableCell align="right">
                            {sections.find((s) => s.id === row.section_id)
                              ?.section_name ?? ""}
                          </TableCell>
                          <TableCell align="right">
                            {row.start_time} - {row.end_time}
                          </TableCell>
                          <TableCell align="right">{row.day_of_week}</TableCell>
                          <TableCell align="right">{row.status}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
