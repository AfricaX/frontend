import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Button, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { deleteRoom } from "../../../api/room";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteRoomsDialog(
  {openDeleteRoomsDialog,
  setOpenDeleteRoomsDialog,
  retrieve}
) {

  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);

  const remove = () => {
      deleteRoom(cookies.AUTH_TOKEN, openDeleteRoomsDialog.id).then((response) => {
        if (response?.ok) {
          toast.success(response?.message);
          retrieve();
          setOpenDeleteRoomsDialog(null);
        }else {
          toast.error(response?.message);
          console.log(response);
        }
      })
  }
  return (
    <>
      <Dialog open={!!openDeleteRoomsDialog} TransitionComponent={Transition}>
        <DialogTitle>Delete Room</DialogTitle>
        <DialogContent>
          <Box>
            <Typography>Are you sure you want to delete this room - {openDeleteRoomsDialog?.room_name}?</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenDeleteRoomsDialog(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={remove}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
