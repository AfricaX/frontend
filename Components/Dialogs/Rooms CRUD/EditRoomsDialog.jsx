import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Button, TextField, InputLabel } from "@mui/material";
import { updateRoom } from "../../../api/room";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import $ from "jquery";
import { retrieveRoomTypes } from "../../../api/roomtype";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditRoomsDialog({
  openEditRoomsDialog,
  setOpenEditRoomsDialog,
  retrieve,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      room_name: openEditRoomsDialog?.room_name,
      room_type_id: 1,
      location: openEditRoomsDialog?.location,
      description: openEditRoomsDialog?.description,
      capacity: openEditRoomsDialog?.capacity,
    };

    updateRoom(body, cookies.AUTH_TOKEN, openEditRoomsDialog?.id).then((response) => {
      if (response?.ok) {
        toast.success(response?.message);
        setOpenEditRoomsDialog(null);
        retrieve();
      } else {
        toast.error(response?.message);
      }
      console.log("Submitting body:", body, response );
    });
  };

  const [rowRoomTypes, setRowRoomTypes] = useState([]);
  const [roomTypeId, setRoomTypeId] = useState("");

  const getRoomTypes = () => {
    retrieveRoomTypes(cookies.AUTH_TOKEN).then((response) => {
      setRowRoomTypes(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    getRoomTypes();
  }, []);

  return (
    <>
      <Dialog open={!!openEditRoomsDialog} TransitionComponent={Transition}>
        <DialogTitle>Edit Room - {openEditRoomsDialog?.room_name} </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={onSubmit}>
            <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={2}>
              <Box>
                <InputLabel>Room Name</InputLabel>
                <TextField
                  id="room_name"
                  variant="outlined"
                  value={openEditRoomsDialog?.room_name}
                  onChange={(e) =>
                    setOpenEditRoomsDialog({
                      ...openEditRoomsDialog,
                      room_name: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <InputLabel>Capacity</InputLabel>
                <TextField
                  id="capacity"
                  variant="outlined"
                  type="number"
                  value={openEditRoomsDialog?.capacity}
                  onChange={(e) =>
                    setOpenEditRoomsDialog({
                      ...openEditRoomsDialog,
                      capacity: e.target.value,
                    })
                  }
                />
              </Box>
            </Box>
            <Box>
              <InputLabel>Room Type</InputLabel>
              <Select
                id="room_type_id"
                fullWidth
                value={roomTypeId}
                onChange={(e) => {
                  const value = e.target.value;
                  setRoomTypeId(value);
                  setOpenEditRoomsDialog((prev) => ({
                    ...prev,
                    room_type_id: value,
                  }));
                }}
              >
                {rowRoomTypes?.length > 0 ? (
                  rowRoomTypes.map((roomType) => (
                    <MenuItem key={roomType.id} value={roomType.id}>
                      {roomType.room_type}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Room Types Available</MenuItem>
                )}
              </Select>
            </Box>
            <Box>
              <InputLabel>Location</InputLabel>
              <TextField
                id="location"
                variant="outlined"
                fullWidth
                value={openEditRoomsDialog?.location}
                onChange={(e) =>
                  setOpenEditRoomsDialog({
                    ...openEditRoomsDialog,
                    location: e.target.value,
                  })
                }
              />
            </Box>
            <Box>
              <InputLabel> Description </InputLabel>
              <TextField
                id="description"
                variant="outlined"
                fullWidth
                value={openEditRoomsDialog?.description}
                onChange={(e) =>
                  setOpenEditRoomsDialog({
                    ...openEditRoomsDialog,
                    description: e.target.value,
                  })
                }
              />
            </Box>
            <Box>
              <InputLabel>Room Image</InputLabel>
              <TextField
                id="image"
                type="file"
                accept="image/*"
                fullWidth
              ></TextField>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                position: "absolute",
                bottom: "10px",
              }}
              onClick={onSubmit}
            >
              UPDATE
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenEditRoomsDialog(null)}
            color="error"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
