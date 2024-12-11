import { AppBar } from "@mui/material";
import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { logout as logoutAPI } from "../../api/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import RoomsListDialog from "../Dialogs/RoomsListDialog";
import BookingListDialog from "../Dialogs/BookingListDialog";
import SectionListDialog from "../Dialogs/SectionListDialog";

export default function Navbar() {
  /**AUTH_TOKEN */
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    logoutAPI(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        toast.success(response?.message);
        removeCookie("AUTH_TOKEN");
        dispatch(logout(cookies.AUTH_TOKEN));
        navigate("/login");
      } else {
        toast.error(response?.message);
      }
    });
  };

  /** ROOMS DIALOG */
  const [openRoomsListDialog, setOpenRoomsListDialog] = useState(false);

  const handleRoomsClick = () => {
    setOpenRoomsListDialog(true);
  };

  /**
   * BOOKINGS DIALOG
   */

  const [openBookingListDialog, setOpenBookingListDialog] = useState(false);

  const handleBookingsClick = () => {
    setOpenBookingListDialog(true);
  };

  /**
   * Sections Dialog
   */

  const [openSectionListDialog, setOpenSectionListDialog] = useState(false);

  const handleSectionsClick = () => {
    setOpenSectionListDialog(true);
  };

  return (
    <>
      <AppBar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          position: "static",
          boxShadow: "3px 3px 3px grey",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ marginLeft: "20px", flex: 2, textAlign: "left" }}>
            <Box sx={{ display: "flex", height: "100px", width: "300px" }}>
              <img src="src/assets/logo.png" alt="" />
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              sx={{
                color: "#2f3a8f",
                flex: 1,
                fontSize: "20px",
              }}
              onClick={handleSectionsClick}
            >
              Sections
            </Button>

            <Button
              sx={{
                color: "#2f3a8f",
                flex: 1,
                fontSize: "20px",
              }}
              onClick={handleRoomsClick}
            >
              Rooms
            </Button>

            <Button
              sx={{
                color: "#2f3a8f",
                flex: 1,
                fontSize: "20px",
              }}
              onClick={handleBookingsClick}
            >
              Bookings
            </Button>

            <Button
              sx={{
                color: "#2f3a8f",
                flex: 1,
                fontSize: "20px",
              }}
            >
              Tools
            </Button>

            <Button
              variant="outlined"
              color="error"
              sx={{
                color: "red",
                flex: 1,
                fontSize: "20px",
                height: "40px",
                marginRight: "20px",
              }}
              onClick={onSubmit}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </AppBar>

      <RoomsListDialog
        openRoomsListDialog={openRoomsListDialog}
        setOpenRoomsListDialog={setOpenRoomsListDialog}
      />

      <BookingListDialog
        openBookingListDialog={openBookingListDialog}
        setOpenBookingListDialog={setOpenBookingListDialog}
      />

      <SectionListDialog
        openSectionListDialog={openSectionListDialog}
        setOpenSectionListDialog={setOpenSectionListDialog}
      />
    </>
  );
}
