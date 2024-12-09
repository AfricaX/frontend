import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Button,  } from "@mui/material";
import Rooms from "../UI/Rooms";


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
          <Box sx={{ width: "100%" , marginTop: "30px"}}>
            <Rooms />
          </Box>
          <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
            <Button
              onClick={() => setOpenRoomsListDialog(false)}
              variant="outlined"
              color="error"
            >
              X
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
