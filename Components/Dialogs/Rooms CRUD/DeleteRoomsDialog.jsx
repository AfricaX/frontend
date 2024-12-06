import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Button, Typography } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteRoomsDialog(
  {openDeleteRoomsDialog,
  setOpenDeleteRoomsDialog,
  retrieve}
) {
  return (
    <>
      <Dialog open={openDeleteRoomsDialog} TransitionComponent={Transition}>
        <DialogTitle>Delete Room</DialogTitle>
        <DialogContent>
          <Box>
            <Typography>Are you sure you want to delete this room - "Room_Name"?</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setOpenDeleteRoomsDialog(false)}>Cancel</Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
