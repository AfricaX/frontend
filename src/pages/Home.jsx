import { Check } from "@mui/icons-material";
import React from "react";
import checkAuth from "../hoc/checkToken";
import { useSelector } from "react-redux";
import Navbar from "../components/UI/Navbar";
import Recents from "../components/UI/Recents";
import Login from "./Login";
import MyCalendar from "../components/UI/MyCalendar";
import { Box } from "@mui/material";

function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Box className="flex flex-col md:flex-row justify-center items-center min-h-[100vh] p-4 mt-24 md:mt-0">

            <Box className="w-full md:w-1/2 h-[60vh] flex mb-10 md:mb-0 ">
              <Recents />
            </Box>
            <Box className="w-full md:w-1/2 h-[60vh] flex">
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
