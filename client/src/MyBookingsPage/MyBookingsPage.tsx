import { useState } from "react";
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
  const [statusMessage, setStatusMessage] = useState("");

  function searchForBooking(email: string, bookingId: string) {
    if (email && bookingId) {
      setShowBooking(true);
      setSearchFailed(false);
      setStatusMessage("");
    }else{
      setSearchFailed(true);
      setStatusMessage("Ingen bokning som matchar din sökning kunde hittas. ");
      //no result found
  };
    
  }
  function deleteBooking(booking:Booking) {
    setShowBooking(false);
    //todo check if completed
    setStatusMessage("Bokningen har tagits bort. ")
  }
  return (
    <div className="container text-center">
      <h1>Sök Bokning </h1>
      <SearchBookingComponent
        searchFuntion={searchForBooking}
      ></SearchBookingComponent>
      {showBooking && (
        <div className="container booking-container">
          <Card variant="outlined" sx={{ minWidth: 260, width: 400}}>
            <BookingComponent
              booking={bookingExample}
              deleteFunction={deleteBooking}
            ></BookingComponent>
          </Card>
        </div>
      )}
      {statusMessage.length>0 && <h4>{statusMessage}</h4>}
    </div>
  );
};
export default MyBookingsPage;