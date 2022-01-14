import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookingContext } from '../Contexts/BookingContext';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import 'rsuite/dist/rsuite.min.css';
import ChoachPickerComponent from './CoachPickerComponent';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backgroundColor: "#2e445b",
}));

const AdditionalChoicesPage = () => {
  let nav = useNavigate();
  const [context, updateContext] = useContext(BookingContext);

  let options = [
    {
      id: '0',
      name: 'Vanlig vagn',
      price: Math.round(
        context.dbData.OutboundTrips[0].estimatedPrices[1].price
      ),
    },
    {
      id: '1',
      name: 'Tyst vagn',
      price: Math.round(
        context.dbData.OutboundTrips[0].estimatedPrices[3].price
      ),
    },
    {
      id: '2',
      name: 'Djurvagn',
      price: Math.round(
        context.dbData.OutboundTrips[0].estimatedPrices[2].price
      ),
    },
  ];

  function coachHandler(toggledCoachId: string) {
    const coach = options.find(({ id }) => id === toggledCoachId);
    if (coach) {
      if (coach.name === 'Tyst vagn') {
        if (context.searchData.returnTrip === false) {
          updateContext({
            ...context,
            SelectedTrain: {
              ...context.SelectedTrain,
              TotalTicketPrice: coach.price,
              class: 'Quiet Cart',
            },
          });
        } else {
          updateContext({
            ...context,
            SelectedTrain: {
              ...context.SelectedTrain,
              TotalTicketPrice: coach.price,
              class: 'Quiet Cart',
            },
            SelectedReturnTrain: {
              ...context.SelectedReturnTrain,
              TotalTicketPrice: coach.price,
              class: 'Quiet Cart',
            },
          });
        }
      } else if (coach.name === 'Djurvagn') {
        if (context.searchData.returnTrip === false) {
          updateContext({
            ...context,
            SelectedTrain: {
              ...context.SelectedTrain,
              TotalTicketPrice: coach.price,
              class: 'Animal Friendly',
            },
          });
        } else {
          updateContext({
            ...context,
            SelectedTrain: {
              ...context.SelectedTrain,
              TotalTicketPrice: coach.price,
              class: 'Animal Friendly',
            },
            SelectedReturnTrain: {
              ...context.SelectedReturnTrain,
              TotalTicketPrice: coach.price,
              class: 'Animal Friendly',
            },
          });
        }
      } else if (coach.name === 'Vanlig vagn') {
        if (context.searchData.returnTrip === false) {
          updateContext({
            ...context,
            SelectedTrain: {
              ...context.SelectedTrain,
              TotalTicketPrice: coach.price,
              class: 'Second Class',
            },
          });
        } else {
          updateContext({
            ...context,
            SelectedTrain: {
              ...context.SelectedTrain,
              TotalTicketPrice: coach.price,
              class: 'Second Class',
            },
            SelectedReturnTrain: {
              ...context.SelectedReturnTrain,
              TotalTicketPrice: coach.price,
              class: 'Second Class',
            },
          });
        }
      }
    }
  }

  function nextPage() {
    nav('/payment');
  }

  return (
    <div>
      <div className="container mt-5 text-center">
        <h1 className="font-color">Tillval</h1>
      </div>

      <div className="container" id="additional-choices-list">
        <Stack spacing={2}>
          <Item className="mb-4">
            <h4 className="mb-3 input-color">Välj typ av vagn:</h4>
            <ChoachPickerComponent options={options} handler={coachHandler} />
          </Item>
        </Stack>
      </div>

      <div className="container">
        <div>
          <Link to="/payment">
            <button
              id="continue-to-payment-btn"
              className="btn confirm-button float-right"
              onClick={nextPage}
            >
              Fortsätt
            </button>
          </Link>
          <Link to="/results">
            <button id="back-to-results-btn" className="btn back-button">
              Tillbaka
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdditionalChoicesPage;
