import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button, Paper } from "@mui/material";
import Recents from "../UI/Recents";
import Rooms from "../UI/Rooms";
import { Create } from "@mui/icons-material";
import CreateRoomsDialog from "./Rooms CRUD/CreateRoomsDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function RoomsListDialog({
  openRoomsListDialog,
  setOpenRoomsListDialog,
}) {
  return (
    <>
      <Dialog
        open={openRoomsListDialog}
        TransitionComponent={Transition}
        fullScreen
        sx={{ margin: "50px" }}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Rooms />
          <Button
            onClick={() => setOpenRoomsListDialog(false)}
            sx={{
              position: "absolute",
              right: "20px",
              bottom: "10px",
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
