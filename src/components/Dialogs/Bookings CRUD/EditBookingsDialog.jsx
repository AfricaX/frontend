import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, Button, InputLabel } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { update } from "../../../api/booking";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditBookingsDialog({
  rooms,
  subjects,
  sections,
  retrieve,
  openEditBookingsDialog,
  setOpenEditBookingsDialog,
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);

  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [bookFrom, setBookFrom] = useState(null);
  const [bookUntil, setBookUntil] = useState(null);

  const [roomId, setRoomId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [day, setDay] = useState([]);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (openEditBookingsDialog) {
      setRoomId(openEditBookingsDialog.room_id || "");
      setSubjectId(openEditBookingsDialog.subject_id || "");
      setSectionId(openEditBookingsDialog.section_id || "");
      setDay(
        Array.isArray(openEditBookingsDialog.day_of_week)
          ? openEditBookingsDialog.day_of_week
          : []
      );
      setStartTime(dayjs(openEditBookingsDialog.start_time, "HH:mm") || null);
      setEndTime(dayjs(openEditBookingsDialog.end_time, "HH:mm") || null);
      setBookFrom(
        dayjs(openEditBookingsDialog.book_from, "YYYY-MM-DD") || null
      );
      setBookUntil(
        dayjs(openEditBookingsDialog.book_until, "YYYY-MM-DD") || null
      );
    }
  }, [openEditBookingsDialog]);

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      user_id: user?.id,
      status: openEditBookingsDialog?.status,
      room_id: openEditBookingsDialog?.room_id || roomId,
      subject_id: openEditBookingsDialog?.subject_id || subjectId,
      section_id: openEditBookingsDialog?.section_id || sectionId,
      day_of_week: Array.isArray(day) ? day : [],
      start_time: startTime?.format("HH:mm"),
      end_time: endTime?.format("HH:mm"),
      book_from: bookFrom?.format("YYYY-MM-DD"),
      book_until: bookUntil?.format("YYYY-MM-DD"),
    };

    update(body, cookies.AUTH_TOKEN, openEditBookingsDialog?.id).then(
      (response) => {
        console.log(response);
        if (response?.ok) {
          toast.success(response?.message);
          retrieve();
          setOpenEditBookingsDialog(null);
        } else {
          toast.error(response?.message);
        }
        console.log(body, response);
      }
    );
  };
  useEffect(() => {
    if (openEditBookingsDialog) {
      setDay(openEditBookingsDialog.day_of_week || []); // Ensure day_of_week is an array.
    }
  }, [openEditBookingsDialog]);

  return (
    <>
      <Dialog open={!!openEditBookingsDialog} TransitionComponent={Transition}>
        <DialogTitle>Create New Booking</DialogTitle>
        <DialogContent>
          <Box component={"form"} sx={{ height: "400px" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Box>
                <InputLabel> Room </InputLabel>
                <Select
                  fullWidth
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                >
                  {rooms?.length > 0 ? (
                    rooms.map((room) => (
                      <MenuItem key={room.id} value={room.id}>
                        {room.room_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Room Types Available</MenuItem>
                  )}
                </Select>
              </Box>
              <Box>
                <InputLabel> Subject </InputLabel>
                <Select
                  fullWidth
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                >
                  {subjects?.length > 0 ? (
                    subjects.map((subject) => (
                      <MenuItem key={subject.id} value={subject.id}>
                        {subject.subject_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Subjects Available</MenuItem>
                  )}
                  <MenuItem></MenuItem>
                </Select>
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Box>
                <InputLabel> Day Of Week </InputLabel>
                <Select
                  fullWidth
                  multiple
                  value={Array.isArray(day) ? day : []}
                  onChange={(e) => setDay(e.target.value || [])}
                  renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="Monday"> Monday </MenuItem>
                  <MenuItem value="Tuesday"> Tuesday </MenuItem>
                  <MenuItem value="Wednesday"> Wednesday </MenuItem>
                  <MenuItem value="thursday"> Thursday </MenuItem>
                  <MenuItem value="Friday"> Friday </MenuItem>
                  <MenuItem value="Saturday"> Saturday </MenuItem>
                  <MenuItem value="Sunday"> Sunday </MenuItem>
                </Select>
              </Box>
              <Box>
                <InputLabel> Section </InputLabel>
                <Select
                  fullWidth
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                >
                  {sections?.length > 0 ? (
                    sections.map((section) => (
                      <MenuItem key={section.id} value={section.id}>
                        {section.section_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Sections Available</MenuItem>
                  )}
                </Select>
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Box>
                <InputLabel> Start Time</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    value={
                      startTime ||
                      dayjs(openEditBookingsDialog?.start_time, "HH:mm")
                    }
                    onChange={(newValue) => setStartTime(newValue)}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <InputLabel>End Time</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    value={
                      endTime ||
                      dayjs(openEditBookingsDialog?.end_time, "HH:mm")
                    }
                    onChange={(newValue) => setEndTime(newValue)}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <Box>
                <InputLabel>Book From</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    value={
                      bookFrom ||
                      dayjs(openEditBookingsDialog?.book_from, "YYYY-MM-DD")
                    }
                    onChange={(newValue) => setBookFrom(newValue)}
                  />
                </LocalizationProvider>
              </Box>
              <Box>
                <InputLabel>Book Until</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    value={
                      bookUntil ||
                      dayjs(openEditBookingsDialog?.book_from, "YYYY-MM-DD")
                    }
                    onChange={(newValue) => setBookUntil(newValue)}
                  />
                </LocalizationProvider>
              </Box>
            </Box>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ marginTop: "20px" }}
            >
              <Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenEditBookingsDialog(false)}
                >
                  Cancel
                </Button>
              </Box>
              <Box>
                <Button variant="contained" color="success" onClick={onSubmit}>
                  Update
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
