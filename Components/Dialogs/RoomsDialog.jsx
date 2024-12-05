import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button, Paper } from "@mui/material";
import Recents from "../UI/Recents";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function RoomsDialog({openRoomsDialog, setOpenRoomsDialog }) {

 

  return (
    <>
      <Dialog
        open={openRoomsDialog}
        TransitionComponent={Transition}
        fullScreen
        sx={{ margin: "50px" }}
      >
        <DialogTitle>Rooms</DialogTitle>
        <DialogContent>
          <Recents />
          <Button onClick={() => setOpenRoomsDialog(false)} sx={{
            position: "absolute",
            right: "20px",
            bottom: "20px"
          }}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );

}
