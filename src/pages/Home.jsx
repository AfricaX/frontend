import { Check } from "@mui/icons-material";
import React from "react";
import checkAuth from "../../hoc/checkToken";
import { useSelector } from "react-redux";
import Navbar from "../../Components/UI/Navbar";
import Recents from "../../Components/UI/Recents";
import Login from "./Login";
import Calendar from "../../Components/UI/Calendar";

function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {user ? (
        <>
          <Navbar />
          <Recents />
          <Calendar />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default checkAuth(Home);
