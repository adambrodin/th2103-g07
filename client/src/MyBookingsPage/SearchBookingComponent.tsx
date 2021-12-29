import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface Props {
  searchFuntion: (email: string, bookingId: string) => void;
}

const SearchBookingComponent = ({ searchFuntion }: Props) => {
  const [emailError, setEmailError] = useState(false);
  const [bookingIdError, setBookingIdError] = useState(false);
  const [email, setEmail] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookingIdErrorMessage, setBookingIdErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [searchReady, setSearchReady] = useState(false);

  useEffect(() => {
    if (!searchReady) return;
    if (!emailError && !bookingIdError) {
      searchFuntion(email, bookingId);
    }
    setSearchReady(false);
  }, [
    searchReady,
    emailError,
    bookingIdError,
    searchFuntion,
    email,
    bookingId,
  ]);

  function validateBookingId(id: string) {
    if (id.length > 1) {
      setBookingIdError(false);
      setBookingIdErrorMessage("");
    } else {
      setBookingIdError(true);
      setBookingIdErrorMessage("Incorrect entry. ");
    }
  }
  function validateEmail(emailToValidate: string) {
    const emailRegex = /\S+@\S+/;
    if (String(emailToValidate).toLowerCase().match(emailRegex)) {
      setEmailError(false);
      setEmailErrorMessage("");
    } else {
      setEmailError(true);
      setEmailErrorMessage("Incorrect entry. ");
    }
  }
  function search() {
    validateBookingId(bookingId);
    validateEmail(email);
    setSearchReady(true);
  }

  return (
    <>
      <span>
        {" "}
        Här kan du avsluta aktiva bokningar. Hitta dina bokningar genom att mata
        in dess referensnummer samt email-addressen du använde vid bokningen i
        fältet nedan:
      </span>
      <br />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "32ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="email-textfield-container">
          <TextField
            error={emailError}
            id="booking-search-email-input"
            className="text-field-email-input"
            label="Email"
            helperText={emailErrorMessage}
            onChange={(e) => setEmail(e.target.value)}
            multiline={true}
          />{" "}
        </div>
        <div className="booking-reference-container">
          <TextField
            error={bookingIdError}
            id="booking-search-id-input"
            className="text-field-booking-reference-input"
            label="Referensnummer"
            helperText={bookingIdErrorMessage}
            onChange={(e) => setBookingId(e.target.value)}
            multiline={true}
          />
        </div>
        <div>
          <button
            id="search-booking-btn"
            className="btn btn-success"
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
