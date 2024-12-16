import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { login as loginAPI } from "../api/auth";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [warnings, setWarnings] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    loginAPI({
      email: $("#email").val(),
      password: $("#password").val(),
    }).then((res) => {
      if (res?.ok) {
        setCookie("AUTH_TOKEN", res.data.token);
        dispatch(login(res.data));
        navigate("/");
        setWarnings({});
        toast.success(res?.message ?? "Logged in successfully!");
      } else {
        toast.error(res?.message ?? "Something Went Wrong!");
        setWarnings({ errors: res?.errors });
      }
    });
  };
  return (
    <Container className=" min-h-screen flex justify-center items-center">
      <Box className="shadow shadow-black rounded-xl p-4 ">
        <Typography className="text-center" variant="h4">
          Login
        </Typography>
        <Box className="grid mt-4 md:grid-cols-2">
          <Box className="m-2 ">
            <img
              src="https://www.mfi.org.ph/wp-content/uploads/2020/04/mfi-logo.png"
              alt="logo of MFI"
              className="w-32 block m-auto "
            />
          </Box>
          <Box
            component="form"
            className="flex justify-center items-center h-4/5 flex-col"
            onSubmit={onSubmit}
          >
            <Box className="mb-2 mt-2 w-full">
              <TextField
                type="Email"
                placeholder="Email"
                label="Email"
                required
                fullWidth
                size="small"
                id="email"
              />
            </Box>
            <Box className="mb-2 mt-2 w-full">
              <TextField
                type="password"
                placeholder="Password"
                label="Password"
                required
                fullWidth
                size="small"
                id="password"
              />
              {warnings?.errors ? (
                <Typography className="text-red-600 text-center">
                  {warnings?.errors}
                </Typography>
              ) : null}
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="block m-auto"
            >
              Login
            </Button>
          </Box>
        </Box>
        <Link
          className="flex justify-center gap-2 items-center flex-wrap"
          to="/register"
        >
          Don't you have an account yet?{" "}
          <Typography className="text-blue-600">Sign up</Typography>
        </Link>
      </Box>
    </Container>
  );
}
