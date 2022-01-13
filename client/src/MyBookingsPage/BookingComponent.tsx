import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ReceiptResponseDto } from '../../../shared/dtos/responses/receipt-response.dto';

interface Props {
  deleteFunction: (receipt: ReceiptResponseDto) => void;
  receipt: ReceiptResponseDto;
}
const BookingComponent = ({ deleteFunction, receipt }: Props) => {
  return (
    <Box
      sx={{ bgcolor: '#2e445b' }}
      style={{ color: 'white', padding: '1rem 3rem' }}
    >
      <Grid item xs>
        <Typography gutterBottom variant="h4" component="div">
          Din bokning
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <p className="text-bold font-color"> Bokningsreferens: </p>{' '}
        {receipt.booking.id}
      </Grid>
      <Grid item xs={12}>
        <p className="text-bold font-color"> Bokning lagd: </p> {receipt.date}
      </Grid>
      <Grid item xs={12}>
        <p className="text-bold font-color">Totalbelopp: </p>{' '}
        {receipt.totalPrice} SEK
      </Grid>
      <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
        <button
          id="delete-receipt-btn"
          className="btn back-button"
          onClick={() => deleteFunction(receipt)}
        >
          Ta bort
        </button>
      </Box>
    </Box>
  );
};
export default BookingComponent;
