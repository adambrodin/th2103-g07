import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Booking from "./Booking";

interface Props {
  deleteFunction: (booking:Booking) => void;
  booking:Booking;
}
const BookingComponent = ({deleteFunction, booking}: Props) => {
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Grid item xs>
        <Typography gutterBottom variant="h4" component="div">
          Ta bort Bokning
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <p className="text-bold"> Bokningsreferens: </p> {booking.id}
      </Grid>
      <Grid item xs={12}>
        <p className="text-bold"> Bokning lagd: </p> {booking.time}
      </Grid>
      <Grid item xs={12}>
        <p className="text-bold">Belopp: </p> {booking.price} SEK
      </Grid>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <button 
        id="delete-booking-btn" 
        className="btn btn-secondary"
        onClick={()=>deleteFunction(booking)}>
          Ta bort
        </button>
      </Box>
    </Box>
  );
};
export default BookingComponent;
