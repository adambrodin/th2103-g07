import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import BookingComponent from "./BookingComponent";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SearchBookingComponent from "./SearchBookingComponent";

const bookingExample = {
  id: "jkdsaglfgjajklgbsdf",
  price: 800,
  time: "2021-12-27 17:06",
};

const MyBookingsPage = () => {
  const [showBooking, setShowBooking] = useState(false);
  const tst = (text:string)=>{
    setShowBooking(showBooking ? false : true);
  }
  return (
    <div className="container text-center">
      <h1>Sök Bokning </h1>
      <SearchBookingComponent callback={tst}></SearchBookingComponent>
      {showBooking ? (
        <div className="container booking-container">
          <Card sx={{ minWidth: 400 }}>
          <BookingComponent booking={bookingExample}></BookingComponent>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default MyBookingsPage;
/*<Card sx={{ minWidth: 275 }}>
</Card>*/
