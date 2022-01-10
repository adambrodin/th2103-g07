import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ReceiptResponseDto } from "@shared/dtos/responses/receipt-response.dto";

interface Props {
  deleteFunction: (receipt: ReceiptResponseDto) => void;
  receipt: ReceiptResponseDto;
}
const BookingComponent = ({ deleteFunction, receipt }: Props) => {
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Grid item xs>
        <Typography gutterBottom variant="h4" component="div">
          Din bokning
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <p className="text-bold"> Bokningsreferens: </p> {receipt.booking.id}
      </Grid>
      <Grid item xs={12}>
        <p className="text-bold"> Bokning lagd: </p> {receipt.date}
      </Grid>
      <Grid item xs={12}>
        <p className="text-bold">Totalbelopp: </p> {receipt.totalPrice} SEK
      </Grid>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <button
          id="delete-receipt-btn"
          className="btn btn-secondary"
          onClick={() => deleteFunction(receipt)}
        >
          Ta bort
        </button>
      </Box>
    </Box>
  );
};
export default BookingComponent;
