import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { register } from "../api/auth";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

export default function Register() {
  const [warnings, setWarnings] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      const body = {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        password_confirmation: $("#password_confirmation").val(),
      };
      setLoading(true);
      register(body)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Account Has Been Registed");
            setCookies("AUTH_TOKEN", res.data.token);
            dispatch(login(res.data));
            navigate("/");
          } else {
            toast.error(res?.message ?? "Something went wrong");
            setWarnings(res?.data);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Container className=" min-h-screen flex justify-center items-center">
      <Box
        component="form"
        onSubmit={onSubmit}
        className="flex justify-center align-center bg-white flex-col p-2 rounded-xl w-96 border border-black shadow shadow-black md:grid-cols-2"
      >
        <Typography className="text-center font-serif m-2" variant="h4">
          Sign up
        </Typography>
        <Box className="mb-2 mt-2">
          <TextField
            type="text"
            placeholder="Username"
            label="Username"
            required
            fullWidth
            size="small"
            id="name"
          />
          {warnings?.name ? (
            <Typography sx={{ fontSize: 12 }} component="small" color="error">
              {warnings.name}
            </Typography>
          ) : null}
        </Box>
        <Box className="mb-2 mt-2">
          <TextField
            type="Email"
            placeholder="Email"
            label="Email"
            required
            fullWidth
            size="small"
            id="email"
          />
          {warnings?.email ? (
            <Typography sx={{ fontSize: 12 }} component="small" color="error">
              {warnings.email}
            </Typography>
          ) : null}
        </Box>
        <Box className="mb-2 mt-2">
          <TextField
            type="password"
            placeholder="Password"
            label="Password"
            required
            fullWidth
            size="small"
            id="password"
          />
          {warnings?.password ? (
            <Typography sx={{ fontSize: 12 }} component="small" color="error">
              {warnings.password}
            </Typography>
          ) : null}
        </Box>
        <Box className="mb-2 mt-2">
          <TextField
            type="password"
            placeholder="Password Confirmation"
            label="Password confirmation"
            required
            fullWidth
            size="small"
            id="password_confirmation"
          />
          {warnings?.password_confirmation ? (
            <Typography sx={{ fontSize: 12 }} component="small" color="error">
              {warnings.password_confirmation}
            </Typography>
          ) : null}
        </Box>
        <Button type="submit" variant="contained">
          Register
        </Button>
        <Link
          to="/login"
          className="no-underline text-center flex justify-center items-center gap-1 mt-2"
        >
          Already have an account
          <Typography className="text-blue-600 font-semibold">Login</Typography>
        </Link>
      </Box>
    </Container>
  );
}
