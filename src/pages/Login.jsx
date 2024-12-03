import React from "react";

import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { login } from "../../api/auth";
import $ from "jquery";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
    login(body).then((response) => {
      if (response?.ok) {
        toast.success(response?.message);
        navigate("/");
      } else {
        toast.error(response?.message);
      }
    });
  };
  return (
    <Container>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "50vh",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "50px",
          boxShadow: "5px 5px 5px #aaaaaa",
          backgroundColor: "white",
        }}
        onSubmit={onSubmit}
      >
        <Typography variant="h4">Log In</Typography>

        <Box sx={{ m: "10px", width: "100%" }}>
          <TextField
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            required
            type="email"
          />
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
        </Box>

        <Box sx={{ m: "20px", width: "100%" }}>
          <Button variant="contained" fullWidth color="success" type="submit">
            Contained
          </Button>
        </Box>

        <Box>
          <Typography>
            Don't have an account?{" "}
            <a href="/register" style={{ color: "blue" }}>
              Sign up
            </a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
