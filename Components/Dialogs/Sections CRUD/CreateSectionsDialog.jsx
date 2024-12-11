import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import $ from "jquery";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { storeSection } from "../../../api/section";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateSectionsDialog({
  openCreateSectionDialog,
  setOpenCreateSectionDialog,
  retrieve
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [types, setTypes] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      section_name: $("#section_name").val(),
      section_type: types,
    };

    storeSection(body, cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        toast.success(response?.message);
        setOpenCreateSectionDialog(false);
        retrieve();
      } else {
        toast.error(response?.message);
      }
      console.log(body);
    });
  };

  return (
    <>
      <Dialog open={!!openCreateSectionDialog}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Box component={"form"} sx={{ width: "300px" }}>
            <Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#2f3a8f",
                  textAlign: "left",
                  marginBottom: "10px",
                }}
              >
                List Of Sections
              </Typography>
            </Box>
            <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpenCreateSectionDialog(false)}
              >
                {" "}
                X{" "}
              </Button>
            </Box>
            <Box>
              <InputLabel>Section Name</InputLabel>
              <TextField fullWidth id="section_name"></TextField>
            </Box>
            <Box>
              <InputLabel> Section Type</InputLabel>
              <Select
                fullWidth
                value={types || ""}
                onChange={(e) => setTypes(e.target.value)}
              >
                <MenuItem value="DTS"> DTS</MenuItem>
                <MenuItem value="Senior High"> Senior Highschool</MenuItem>
                <MenuItem value="Short Course"> Short Course</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button variant="contained" color="success" onClick={onSubmit}>
                Create
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
