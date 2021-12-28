import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

interface Booking {
  booking: { id: string; price: number; time: string };
}

// const ChoachPickerComponent = ({ options, handler }: CoachOptions) => {
const BookingComponent = ({ booking }: Booking) => {
type CallbackFunction = (string)=>void;

  return (
      <Box sx={{ bgcolor: "background.paper" }}>
        <Grid item xs>
          <Typography gutterBottom variant="h4" component="div">
            Ta bort Bokning
          </Typography>
        </Grid>
        <Grid item xs={12}>
          Bokningsreferens: {booking.id}
        </Grid>
        <Grid item xs={12}>
          Bokning lagd: {booking.time}
        </Grid>
        <Grid item xs={12}>
          Pris: {booking.price}
        </Grid>
        <Divider variant="middle" />
        <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
          <button id="delete-booking-btn" className="btn btn-secondary">
            Ta bort
          </button>
        </Box>
      </Box>

  );
};
export default BookingComponent;
