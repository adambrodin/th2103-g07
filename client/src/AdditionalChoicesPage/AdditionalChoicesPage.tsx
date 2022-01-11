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
  color: theme.palette.text.secondary,
}));

const AdditionalChoicesPage = () => {
  let nav = useNavigate();
  const [context, updateContext] = useContext(BookingContext);

  let options = [
    {
      id: '0',
      name: 'Vanlig vagn',
      price: context.dbData.OutboundTrips[0].estimatedPrices[1].price,
    },
    {
      id: '1',
      name: 'Tyst vagn',
      price: context.dbData.OutboundTrips[0].estimatedPrices[3].price,
    },
    {
      id: '2',
      name: 'Djurvagn',
      price: context.dbData.OutboundTrips[0].estimatedPrices[2].price,
    },
  ];

  function coachHandler(toggledCoachId: string) {
    const coach = options.find(({ id }) => id === toggledCoachId);
    if (coach) {
      if (coach.name === 'Tyst vagn') {
        updateContext({
          ...context,
          SelectedTrain: {
            ...context.SelectedTrain,
            TotalTicketPrice: coach.price,
            class: 'QuietCart',
          },
        });
      } else if (coach.name === 'Djurvagn') {
        updateContext({
          ...context,
          SelectedTrain: {
            ...context.SelectedTrain,
            TotalTicketPrice: coach.price,
            class: 'AnimalFriendly',
          },
        });
      } else if (coach.name === 'Vanlig vagn') {
        updateContext({
          ...context,
          SelectedTrain: {
            ...context.SelectedTrain,
            TotalTicketPrice: coach.price,
            class: 'SecondClass',
          },
        });
      }
    }
  }

  /*useEffect(() => {
    updateContext({
      additionalCosts: price,
    });
  }, [price]);*/
  /*
  New choices should be added as stack item
  */
  function nextPage() {
    nav('/payment');
  }

  return (
    <div>
      <div className='container text-center'>
        <h1>Tillval</h1>
      </div>
      <Link to='/results'>
        <button id='back-to-results-btn' className='btn btn-secondary'>
          Tillbaka
        </button>
      </Link>
      <div className='container' id='additional-choices-list'>
        <Stack spacing={2}>
          <Item>
            <h4>Välj typ av vagn:</h4>
            <ChoachPickerComponent options={options} handler={coachHandler} />
          </Item>
        </Stack>
      </div>

      <div className='col'>
        <Link to='/payment'>
          <button
            id='continue-to-payment-btn'
            className='btn btn-success float-right'
            onClick={nextPage}>
            Fortsätt
          </button>
        </Link>
      </div>
    </div>
  );
};
export default AdditionalChoicesPage;
