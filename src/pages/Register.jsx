import { Margin } from "@mui/icons-material";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import $ from "jquery";
import { login, register } from "../../api/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

export default function Register() {
  const [warning, setWarning] = useState({});
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();

  /**Submit Function */
  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      password_confirmation: $("#password_confirmation").val(),
    };

    register(cookies.AUTHTOEKN).then((response) => {
      if (response?.ok) {
        toast.success(response?.message);
        navigate("/");
        setCookie("AUTH_TOKEN", response.data.token);
        dispatch(login(response.data));
      } else {
        toast.error(response?.message);
        setWarning(response?.errors);
      }
    });
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "90vw", sm: "70vw", md: "50vw", lg: "30vw" },
          maxWidth: "400px",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "50px",
          boxShadow: "5px 5px 5px #aaaaaa",
          backgroundColor: "white",
        }}
        onSubmit={onSubmit}
      >
        <Typography variant="h4">Sign Up</Typography>

        <Box sx={{ m: "10px", width: "100%" }}>
          <TextField
            id="name"
            label="Name"
            variant="standard"
            fullWidth
            required
          />
          {warning?.name ? (
            <Typography color="error">{warning?.name}</Typography>
          ) : null}
        </Box>

        <Box sx={{ m: "10px", width: "100%" }}>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            required
            type="email"
          />
          {warning?.email ? (
            <Typography color="error">{warning?.email}</Typography>
          ) : null}
        </Box>

        <Box sx={{ m: "10px", width: "100%" }}>
          <TextField
            id="password"
            label="Password"
            variant="standard"
            fullWidth
            type="password"
            required
          />
          {warning?.password ? (
            <Typography color="error">{warning?.password}</Typography>
          ) : null}
        </Box>

        <Box sx={{ m: "10px", width: "100%" }}>
          <TextField
            id="password_confirmation"
            label="Confirm Password"
            variant="standard"
            fullWidth
            type="password"
            required
          />
          {warning?.password_confirmation ? (
            <Typography color="error">
              {warning?.password_confirmation}
            </Typography>
          ) : null}
        </Box>

        <Box sx={{ m: "20px", width: "100%" }}>
          <Button variant="contained" fullWidth color="success" type="submit">
            Register
          </Button>
        </Box>

        <Box>
          <Typography>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "blue" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
