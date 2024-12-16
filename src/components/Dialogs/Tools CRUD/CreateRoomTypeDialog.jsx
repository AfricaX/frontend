import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
  TextField,
  InputLabel,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import $ from "jquery";
import { storeRoomType } from "../../../api/roomtype";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CreateRoomTypeDialog({
    openCreateRoomTypeDialog,
    setOpenCreateRoomTypeDialog,
    retrieve
}) {

    const [cookies, setCookies, removeCookies] = useCookies(["AUTH_TOKEN"]);

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
          room_type: $("#room_type").val(),
        };
        storeRoomType(body, cookies.AUTH_TOKEN).then((response) => {
          if (response?.ok) {
            toast.success(response?.message);
            setOpenCreateRoomTypeDialog(false);
            retrieve();
          } else {
            toast.error(response?.message);
          }
          console.log(body , response);
        });
      };
    
  return (
    <>
      <Dialog open={!!openCreateRoomTypeDialog} TransitionComponent={Slide}>
        <DialogTitle>Create Room Type</DialogTitle>
        <DialogContent>
          <Box component={"form"} onSubmit={onSubmit}>
            <Box>
              <InputLabel> Room Type Name:</InputLabel>
              <TextField id="room_type" variant="outlined" />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }} mt={2}> 
              <Box>
                <Button variant="contained" color="error" onClick={() => setOpenCreateRoomTypeDialog(false) }> Cancel</Button>
              </Box>
              <Box>
                <Button variant="contained" color="success" type="submit" > Create</Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
