import { AppBar } from "@mui/material";
import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { logout as logoutAPI} from "../../api/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

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
      }else{
        toast.error(response?.message);
      }
    });
  };
  return (
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
          >
            Rooms
          </Button>
          <Button
            sx={{
              color: "#2f3a8f",
              flex: 1,
              fontSize: "20px",
              marginRight: "20px",
            }}
          >
            Bookings
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
  );
}
