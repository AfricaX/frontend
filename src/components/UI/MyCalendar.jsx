import React, { useEffect, useState } from "react";
import { Container, Box, Dialog, DialogActions, DialogContent, DialogTitle, Button, Slide, Card, CardContent, Typography } from "@mui/material";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { indexBookings } from "../../api/booking";
import { useCookies } from "react-cookie";
import dayjs from "dayjs"; 


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const convertTo12HourFormat = (militaryTime) => {
  let [hours, minutes] = militaryTime.split(":");
  hours = parseInt(hours);

  
  const amPm = hours >= 12 ? "PM" : "AM";

  
  hours = hours % 12 || 12;

  
  return `${hours}:${minutes} ${amPm}`;
};

export default function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [bookedDates, setBookedDates] = useState(new Set()); 
  const [bookingsForSelectedDay, setBookingsForSelectedDay] = useState([]); 
  const [cookies] = useCookies("AUTH_TOKEN");
  const [bookings, setBookings] = useState([]);

  const handleClick = (date) => {
    setDate(date);
    setOpen(true);

    
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const bookingsForDay = bookings.filter((booking) => {
      const startDate = dayjs(booking.book_from).format("YYYY-MM-DD");
      const endDate = dayjs(booking.book_until).format("YYYY-MM-DD");
      return formattedDate >= startDate && formattedDate <= endDate;
    });

    setBookingsForSelectedDay(bookingsForDay);
  };

  
  const retrieve = () => {
    indexBookings(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        const booked = response.data.map((booking) => {
          const startDate = dayjs(booking.book_from).format("YYYY-MM-DD"); 
          const endDate = dayjs(booking.book_until).format("YYYY-MM-DD"); 

          
          return startDate === endDate ? startDate : [startDate, endDate];
        }).flat();
        setBookedDates(new Set(booked)); 
        setBookings(response.data); 
      }
    });
  };

  
  useEffect(() => {
    retrieve();
  }, [cookies.AUTH_TOKEN]);

  
  const tileContent = ({ date, view }) => {
    const dateString = date.toISOString().split("T")[0]; 
    if (bookedDates.has(dateString)) {
      return (
        <Box
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "red",
            borderRadius: "50%",
          }}
        />
      );
    }
    return null;
  };

  return (
    <Container className="flex justify-center align-center">
      <Box>
        <Calendar onClickDay={handleClick} tileContent={tileContent} /> {/* Pass tileContent here */}

        <Box className="text-left text-gray-300 ml-10">
          Note: Click on a day to view classes
        </Box>
      </Box>

      {/* Dialog for displaying schedule */}
      <Dialog open={open} TransitionComponent={Transition} onClose={() => setOpen(false)}>
        <DialogTitle>Classes Schedule On: {date.toDateString().slice(4)}</DialogTitle>
        <DialogContent>
          {bookingsForSelectedDay.length > 0 ? (
            bookingsForSelectedDay.map((booking) => (
              <Card key={booking.id} sx={{ marginBottom: 2 }}>
                <CardContent>
                  <Typography variant="h6">Subject: {booking.subjects?.subject_name}</Typography>
                  <Typography>Room: {booking?.rooms?.room_name}</Typography>
                  <Typography>Section: {booking?.sections?.section_name}</Typography>
                  <Typography>Username: {booking?.users?.name}</Typography>
                  {/* Convert start and end time using the helper function */}
                  <Typography>Start Time: {convertTo12HourFormat(booking.start_time)}</Typography>
                  <Typography>End Time: {convertTo12HourFormat(booking.end_time)}</Typography>
                  <Typography>Booked From: {dayjs(booking.book_from).format("MMM DD, YYYY")}</Typography>
                  <Typography>Booked Until: {dayjs(booking.book_until).format("MMM DD, YYYY")}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No classes scheduled for this day.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
