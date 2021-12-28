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
type CallbackFunction = (string)=>void;
interface Booking {
    booking: { id: string; price: number; time: string };
  }
  interface Props {
    callback:CallbackFunction;
  }
    const SearchBookingComponent = ({callback}:Props)=>{
    const [bookingSearch, setBookingSearch] = useState("");
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Incorrect entry. ");

    const [booking, setBooking] = useState({
      id: "",
      price: 0,
      time: "",
    });
    useEffect(() => {
      validateSearchString(bookingSearch);
    }, [bookingSearch]);
  
    function validateSearchString(searchString: string) {
      /*if(searchString.length < 1) {
      setError(true);
        setErrorMessage("Incorrect entry. ");
    } else {*/
      setError(false);
      setErrorMessage("");
      /*}*/
    }
    function search() {
       // setShowBooking(showBooking ? false : true);
       console.log("hej");
       callback("This is fine... ");
      }
    
    return(
    <>
          <span>
        {" "}
        Här kan du avsluta aktiva bokningar. Hitta dina bokningar genom att mata in
        dess referensnummer samt email-addressen du använde vid bokningen i fältet nedan:
      </span>
      <br />
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
      >
        <div className="email-textfield-container">
      <TextField
          error={error}
          id="booking-search-email-input"
          className="text-field-email-input"
          label="email"
          helperText={errorMessage}
          onChange={(e) => setBookingSearch(e.target.value)}
          multiline={true}
          fullWidth={true}
        /> </div>
        <div className="booking-reference-container">         
          <TextField
          error={error}
          id="booking-search-id-input"
          className="text-field-booking-reference-input"
          label="referensnummer"
          helperText={errorMessage}
          onChange={(e) => setBookingSearch(e.target.value)}
          multiline={true}
        />
        </div>
        <div>
        <button
          id="search-booking-btn"
          className="btn btn-success float-right"
          type="button"
          onClick={search}
        >
          Sök
        </button>
        </div>
    </Box>
    </>
    );
};
export default SearchBookingComponent;