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
    <Container className="flex justify-center align-center ">
      <Box>
        <Calendar onClickDay={handleClick} />

        <Box className="tex-left text-gray-300 ml-10">
          Note: Click on a day to view classes
        </Box>
      </Box>

      <CalendarDialogs
        open={open}
        setOpen={setOpen}
        handleClick={handleClick}
        date={date}
      />
    </Container>
  );
}
