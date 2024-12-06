import React, { useEffect, useState } from 'react'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Button, TextField, InputLabel } from "@mui/material";
import { updateRoom } from '../../../api/room';
import { useCookies } from 'react-cookie';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import $ from "jquery";
import { retrieveRoomTypes } from "../../../api/roomtype";

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
        room_name: $("#room_name").val(),
        room_type_id: roomTypeId,
        location: $("#location").val(),
        description: $("#description").val(),
        capacity: $("#capacity").val(),
      };

      updateRoom(body, cookies.AUTH_TOKEN, id).then((response) => {
        if (response?.ok) {
          toast.success(response?.message);
          setOpenEditRoomsDialog(false);
          retrieve();
        } else {
          toast.error(response?.message);
        }
        console.log(body);
      });

        
    }
    
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
      <Dialog open={openEditRoomsDialog} TransitionComponent={Transition}>
        <DialogTitle>Edit Room - Room_Name </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={onSubmit}>
            <Box display={"grid"} gridTemplateColumns={"1fr 1fr"} gap={2}>
              <Box>
                <InputLabel>Room Name</InputLabel>
                <TextField id="room_name" variant="outlined" />
              </Box>
              <Box>
                <InputLabel>Capacity</InputLabel>
                <TextField id="capacity" variant="outlined" type="number" />
              </Box>
            </Box>
            <Box>
              <InputLabel>Room Type</InputLabel>
              <Select
                id="room_type_id"
                fullWidth
                value={roomTypeId || ""}
                onChange={(e) => setRoomTypeId(e.target.value || "")}
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
              <TextField id="location" variant="outlined" fullWidth />
            </Box>
            <Box>
              <InputLabel> Description </InputLabel>
              <TextField id="description" variant="outlined" fullWidth />
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
            >
              CREATE
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenEditRoomsDialog(false)}
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
