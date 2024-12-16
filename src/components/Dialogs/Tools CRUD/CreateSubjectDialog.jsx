import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify"
import $ from "jquery";
import { storeSubject } from "../../../api/subject";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function CreateSubjectDialog({
  openCreateSubjectDialog,
  setOpenCreateSubjectDialog,
  retrieve
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const [types, setTypes] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      subject_name: $("#subject_name").val(),
      subject_type: types,
    };

    storeSubject(body, cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        toast.success(response?.message);
        setOpenCreateSubjectDialog(false);
        retrieve();
      } else {
        toast.error(response?.message);
      }
      console.log(body);
    });
  };

  return (
    <>
      <Dialog open={!!openCreateSubjectDialog} TransitionComponent={Transition}>
        <DialogTitle> Create Subject</DialogTitle>
        <DialogContent>
          <Box component={"form"} onSubmit={onSubmit}>
            <Box mt={2}>
              <InputLabel>Subject Name</InputLabel>
              <TextField id="subject_name"></TextField>
            </Box>
            <Box mt={2}>
              <InputLabel>Subject Type</InputLabel>
              <Select
                fullWidth
                value={types || ""}
                onChange={(e) => setTypes(e.target.value)}
              >
                <MenuItem value="DTS"> DTS </MenuItem>
                <MenuItem value="Senior Highschool">
                  {" "}
                  Senior Highschool{" "}
                </MenuItem>
                <MenuItem value="Short Course"> Short Course</MenuItem>
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenCreateSubjectDialog(false)}
                >
                  {" "}
                  Cancel
                </Button>
              </Box>
              <Box>
                <Button variant="contained" type="submit" color="success">
                  {" "}
                  Create
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
