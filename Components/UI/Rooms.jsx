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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { retrieveRooms } from "../../api/room";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRoomsDialog from "../Dialogs/Rooms CRUD/CreateRoomsDialog";
import ViewRoomsDialog from "../Dialogs/Rooms CRUD/ViewRoomsDialog";

export default function Rooms() {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);

  const retrieve = () => {
    retrieveRooms(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        setRows(response.data);
      }
    });
  };

  useEffect(() => {
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

  const [openViewRoomsDialog, setOpenViewRoomsDialog] = useState(false);

  const handleOpenViewRoomsDialog = () => {
    setOpenViewRoomsDialog(true);
  };

  return (
    <>
      <Box sx={{ margin: "10px" }}>
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

          <Button
            variant="contained"
            color="success"
            sx={{ position: "absolute", right: "40px", top: "45px" }}
            onClick={handleOpenCreateRooms}
          >
            Create Room
          </Button>
        </Box>
        <Box
          sx={{
            width: "95%",
            maxHeight: "400px",
            overflow: "auto",
            marginRight: "20px",
            marginTop: "20px",
            border: "1px solid black",
            position: "absolute",
          }}
        >
          <CreateRoomsDialog
            retrieve={retrieve}
            openCreateRooms={openCreateRooms}
            setOpenCreateRooms={setOpenCreateRooms}
          />
          <ViewRoomsDialog
            openViewRoomsDialog={openViewRoomsDialog}
            setOpenViewRoomsDialog={setOpenViewRoomsDialog}
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
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center"> {row.room_name} </TableCell>
                    <TableCell align="center"> {row.room_type_id}</TableCell>
                    <TableCell align="center">{row.location}</TableCell>
                    <TableCell align="center"> {row.description}</TableCell>
                    <TableCell align="center"> {row.capacity}</TableCell>
                    <TableCell align="center">
                      <Box display={"flex"}>
                        <VisibilityIcon
                          sx={{ flex: 1 }}
                          onClick={handleOpenViewRoomsDialog}
                          cursor={"pointer"}
                        />{" "}
                        <EditIcon sx={{ flex: 1 }} cursor={"pointer"} />
                        <DeleteIcon sx={{ flex: 1 }} cursor={"pointer"} />
                      </Box>
                    </TableCell>
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
