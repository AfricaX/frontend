import { Check } from "@mui/icons-material";
import React from "react";
import checkAuth from "../../hoc/checkToken";
import { useSelector } from "react-redux";
import Navbar from "../../Components/UI/Navbar";
import Recents from "../../Components/UI/Recents";
import Login from "./Login";
import MyCalendar from "../../Components/UI/myCalendar";
import { Box } from "@mui/material";

function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1fr" }}>
            <Recents />
            <MyCalendar />
          </Box>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default checkAuth(Home);
