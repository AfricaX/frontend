import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import { logout as logoutAPI } from "../../api/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import RoomsListDialog from "../Dialogs/RoomsListDialog";
import BookingListDialog from "../Dialogs/BookingListDialog";
import SectionListDialog from "../Dialogs/SectionListDialog";
import ToolsListDialog from "../Dialogs/ToolsListDialog";

export default function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const onSubmit = () => {
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

  const [openRoomsListDialog, setOpenRoomsListDialog] = useState(false);
  const [openBookingListDialog, setOpenBookingListDialog] = useState(false);
  const [openSectionListDialog, setOpenSectionListDialog] = useState(false);
  const [openToolsListDialog, setOpenToolsListDialog] = useState(false);

  const toggleDrawer = (state) => () => {
    setDrawerOpen(state);
  };

  const navButtons = (
    <>
      <Button
        sx={{ color: "#2f3a8f", fontSize: "16px" }}
        onClick={() => setOpenSectionListDialog(true)}
      >
        Sections
      </Button>
      <Button
        sx={{ color: "#2f3a8f", fontSize: "16px" }}
        onClick={() => setOpenRoomsListDialog(true)}
      >
        Rooms
      </Button>
      <Button
        sx={{ color: "#2f3a8f", fontSize: "16px" }}
        onClick={() => setOpenBookingListDialog(true)}
      >
        Bookings
      </Button>
      <Button
        sx={{ color: "#2f3a8f", fontSize: "16px" }}
        onClick={() => setOpenToolsListDialog(true)}
      >
        Tools
      </Button>
      <Button
        variant="outlined"
        color="error"
        sx={{
          color: "red",
          fontSize: "16px",
          marginLeft: isMobile ? "0" : "20px",
        }}
        onClick={onSubmit}
      >
        Logout
      </Button>
    </>
  );

  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "white",
          boxShadow: "3px 3px 3px grey",
          padding: "10px 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Box sx={{ width: isMobile ? "100px" : "100px" }}>
            <img
              src="src/assets/logo.png"
              alt="Logo"
              style={{ width: "100%" }}
            />
          </Box>
          <Box>
            {isMobile ? (
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{ color: "#2f3a8f" }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", gap: "20px" }}>{navButtons}</Box>
            )}
          </Box>
        </Box>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          {navButtons}
        </Box>
      </Drawer>

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
      <ToolsListDialog
        openToolsListDialog={openToolsListDialog}
        setOpenToolsListDialog={setOpenToolsListDialog}
      />
    </>
  );
}
