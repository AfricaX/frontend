import {
  Box,
  Paper,
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
import { toast } from "react-toastify";
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
    <>
      <Box>
        <Box
          sx={{
            marginTop: "100px",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#2f3a8f",
              margin: "10px 0px 0px 10px",
            }}
          >
            Recent Class Scheduled
          </Typography>
        </Box>
        <Box sx={{maxHeight: "400px", overflow: "auto" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ width: "100%",   overflow: "auto", maxHeight: "400px"}} 
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ background: "lightgrey" }}>
                  <TableCell> Created By </TableCell>
                  <TableCell> Created At </TableCell>
                  <TableCell> Room Name</TableCell>
                  <TableCell align="right">Subject</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Days Of Week</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice()
                  .reverse()
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        {users.filter((u) => u.id === row.user_id)[0]?.name ??
                          ""}
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
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
