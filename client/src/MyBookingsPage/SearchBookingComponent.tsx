import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface Props {
  searchFunction: (email: string, bookingId: string) => void;
  searchErrorFunction: () => void;
}

const SearchBookingComponent = ({
  searchFunction,
  searchErrorFunction,
}: Props) => {
  const [emailError, setEmailError] = useState(false);
  const [bookingIdError, setBookingIdError] = useState(false);
  const [email, setEmail] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookingIdErrorMessage, setBookingIdErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  function validateBookingId(id: string) {
    return id.length > 1;
  }
  function validateEmail(emailToValidate: string) {
    const validationPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return validationPattern.test(emailToValidate);
  }

  function search() {
    let idPassedValidation = validateBookingId(bookingId);
    let emailPassedValidation = validateEmail(email);
    setBookingIdError(!idPassedValidation);
    setBookingIdErrorMessage(
      idPassedValidation ? "" : "Ogiltigt referensnummer. "
    );
    setEmailError(!emailPassedValidation);
    setEmailErrorMessage(emailPassedValidation ? "" : "Ogiltigt email. ");
    if (idPassedValidation && emailPassedValidation) {
      searchFunction(email, bookingId);
    } else {
      searchErrorFunction();
    }
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
