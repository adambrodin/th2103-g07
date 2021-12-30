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
const EMPTY_BOOKING = {
  id: "",
  price: 0,
  time: "",
};
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://train-booking-function-app.azurewebsites.net/api"
    : (process.env.REACT_APP_API_URL as string);

const MyBookingsPage = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState<Booking>(EMPTY_BOOKING);
  //const [successfulDelete, setSuccessfulDelete] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  function searchForBooking(email: string, bookingId: string) {
    if (email && bookingId) {
      setShowBooking(true);
      setSearchFailed(false);
      setStatusMessage("");
    } else {
      setSearchFailed(true);
      setStatusMessage("Ingen bokning som matchar din sökning kunde hittas. ");
      //no result found
    }
  }
  // When search button triggers but no search is made or expected to be made
  function searchErrorFunction() {
    setShowBooking(false);
    setBooking(EMPTY_BOOKING);
  }
  useEffect(() => {
    if (!searchFailed) return;
  }, [searchFailed]);

  /*  async function findBooking(email: string, bookingId: string){
    const searchData = {
      email: email,
      bookingId: bookingId
    };
    fetch(API_URL + '/booking/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(searchData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data !== undefined) {
          set
          //setTripData(tripData.concat(data.data));
          //setHide(!hide);
        } else {
          setSearchFailed(true);
        }
      });
  
  }*/
  function deleteBooking(booking: Booking) {
    setShowBooking(false);
    //todo check if completed
    setStatusMessage("Bokningen har tagits bort. ");
  }
  return (
    <div className="container text-center">
      <h1>Sök Bokning </h1>
      <SearchBookingComponent
        searchFunction={searchForBooking}
        searchErrorFunction={searchErrorFunction}
      ></SearchBookingComponent>
      {showBooking && (
        <div className="container booking-container">
          <Card variant="outlined" sx={{ minWidth: 260, width: 400 }}>
            <BookingComponent
              booking={bookingExample}
              deleteFunction={deleteBooking}
            ></BookingComponent>
          </Card>
        </div>
      )}
      {statusMessage.length > 0 && <h4>{statusMessage}</h4>}
    </div>
  );
};
export default MyBookingsPage;
