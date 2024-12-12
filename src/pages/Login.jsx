import React from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { login as loginAPI } from "../../api/auth";
import $ from "jquery";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
    loginAPI(body).then((response) => {
      if (response?.ok) {
        toast.success(response?.message);
        navigate("/");
        setCookie("AUTH_TOKEN", response.data.token);
        dispatch(login(response.data));
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
          width: "50vh",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "50px",
          boxShadow: "5px 5px 5px #aaaaaa",
          backgroundColor: "white",
          height: "450px",
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
            Log In
          </Button>
        </Box>

        <Box>
          <Typography>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "blue" }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
