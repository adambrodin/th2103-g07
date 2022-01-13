import { useState, useEffect } from "react";
import BookingComponent from "./BookingComponent";
import Card from "@mui/material/Card";
import SearchBookingComponent from "./SearchBookingComponent";
import { ReceiptResponseDto } from "../../../shared/dtos/responses/receipt-response.dto";
import "./MyBookingsPage.css";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://train-booking-function-app.azurewebsites.net/api"
    : (process.env.REACT_APP_API_URL as string);

const MyBookingsPage = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState<ReceiptResponseDto>();
  const [searchFailed, setSearchFailed] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [bookingCredentials, setBookingCredentials] = useState({});

  async function searchForBooking(email: string, bookingId: string) {
    if (email && bookingId) {
      await findBooking(email, bookingId);
      setSearchFailed(false);
      setStatusMessage("");
    } else {
      setSearchFailed(true);
      setStatusMessage("Ingen bokning som matchar din sökning kunde hittas. ");
    }
  }
  // When search button triggers but no search is made or expected to be made
  function searchErrorFunction() {
    setShowBooking(false);
  }
  useEffect(() => {
    if (!searchFailed) return;
  }, [searchFailed]);

  async function findBooking(email: string, bookingId: string) {
    const searchData = {
      email: email,
      bookingId: bookingId,
    };

    fetch(API_URL + "/booking/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(searchData),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data !== undefined) {
          setBooking(data);
          setShowBooking(true);

          setBookingCredentials(searchData);
        } else {
          setShowBooking(false);
          setStatusMessage(
            "Bokningen kunde ej hittas. Vänligen verifiera uppgifterna och försök igen!"
          );
          setSearchFailed(true);
        }
      });
  }

  function deleteBooking() {
    fetch(API_URL + "/booking/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(bookingCredentials),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data !== undefined) {
          setShowBooking(false);
          setStatusMessage("Bokningen har tagits bort. ");
        } else {
          setStatusMessage("Ett fel har uppstått, vänligen försök igen.");
        }
      });
  }
  return (
    <div className="container text-center">
      <h1 className="header-text font-color">Sök Bokning </h1>
      <SearchBookingComponent
        searchFunction={searchForBooking}
        searchErrorFunction={searchErrorFunction}
      ></SearchBookingComponent>
      {showBooking && (
        <div className="booking-reference">
          <Card variant="outlined">
            <BookingComponent
              receipt={booking as ReceiptResponseDto}
              deleteFunction={deleteBooking}
            ></BookingComponent>
          </Card>
        </div>
      )}

      <div className="status-msg font-color">
        {statusMessage.length > 0 && <h4>{statusMessage}</h4>}
      </div>
    </div>
  );
};
export default MyBookingsPage;
