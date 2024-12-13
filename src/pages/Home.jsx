import { Check } from "@mui/icons-material";
import React from "react";
import checkAuth from "../../hoc/checkToken";
import { useSelector } from "react-redux";
import Navbar from "../../Components/UI/Navbar";
import Recents from "../../Components/UI/Recents";
import Login from "./Login";
import MyCalendar from "../../Components/UI/MyCalendar";
import { Box } from "@mui/material";

function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Box>
              <Recents />
            </Box>
            <Box>
              <MyCalendar />
            </Box>
          </Box>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default checkAuth(Home);
