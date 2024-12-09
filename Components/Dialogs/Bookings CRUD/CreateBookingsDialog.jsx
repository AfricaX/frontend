import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Button, TextField, InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import $ from "jquery";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateBookingsDialog() {
  return (
    <>
      <Dialog open={true}>
        <DialogTitle>Create New Booking</DialogTitle>
        <DialogContent>
            <Box component={"form"}>

            </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
