import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarDialogs from "../Dialogs/CalendarDialogs";

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleClick = (date) => {
    setDate(date);
    setOpen(true);
  };
  return (
    <>
      <Container sx={{ marginTop: "50px" }}>
        <Calendar onClickDay={handleClick}  />

        <Box sx={{ textAlign: "left", color: "grey", marginLeft: "20px" }}>
          Note: Click on a day to view classes
        </Box>
      </Container>

      <CalendarDialogs
        open={open}
        setOpen={setOpen}
        handleClick={handleClick}
        date={date}
      />
    </>
  );
}
