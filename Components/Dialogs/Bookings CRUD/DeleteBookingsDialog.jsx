import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Button, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { destroy } from "../../../api/booking";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteBookingsDialog({
  retrieve,
  openDeleteBookingsDialog,
  setOpenDeleteBookingsDialog,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);

  const remove = () => {
    destroy(cookies.AUTH_TOKEN, openDeleteBookingsDialog.id).then(
      (response) => {
        if (response?.ok) {
          toast.success(response?.message);
          retrieve();
          setOpenDeleteBookingsDialog(null);
        } else {
          toast.error(response?.message);
          console.log(response);
        }
      }
    );
  };

  return (
    <>
      <Dialog
        open={!!openDeleteBookingsDialog}
        TransitionComponent={Transition}
      >
        <DialogTitle>Delete Booking</DialogTitle>
        <DialogContent>
          <Box>
            <Typography>
              Are you sure you want to delete this booking
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenDeleteBookingsDialog(null)}
          >
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={remove}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
