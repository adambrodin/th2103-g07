import * as React from "react";
import { useState, useEffect } from "react";

import BookingComponent from "./BookingComponent";

import Card from "@mui/material/Card";

import SearchBookingComponent from "./SearchBookingComponent";
import Booking from "./Booking";

const bookingExample = {
  id: "1342adfad342ff2191237",
  price: 800,
  time: "2021-12-27 17:06",
};

const MyBookingsPage = () => {
  const [showBooking, setShowBooking] = useState(false);
  //const [successfulDelete, setSuccessfulDelete] = useState(false);
  const [, setSearchFailed] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  function searchForBooking(email: string, bookingId: string) {
    if (email && bookingId) {
      setShowBooking(true);
      setSearchFailed(false);
    }else{
      setSearchFailed(true);
      setSearchMessage("Ingen bokning som matchar din sökning kunde hittas. ")
      //no result found
  };
    
  }
  function deleteBooking(booking:Booking) {
    setShowBooking(false);
    //todo check if completed
    setSearchMessage("Bokningen har tagits bort. ")
  }
  return (
    <div className="container text-center">
      <h1>Sök Bokning </h1>
      <SearchBookingComponent
        searchFuntion={searchForBooking}
      ></SearchBookingComponent>
      {showBooking && (
        <div className="container booking-container">
          <Card sx={{ minWidth: 300, width: 500 }}>
            <BookingComponent
              booking={bookingExample}
              deleteFunction={deleteBooking}
            ></BookingComponent>
          </Card>
        </div>
      )}
      {searchMessage.length>0 && <h4>{searchMessage}</h4>}
   
    </div>
  );
};
export default MyBookingsPage;
