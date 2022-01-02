import React, { useContext, useState, useEffect } from 'react';
import './Payment.css';
import { BookingContext } from '../Contexts/BookingContext';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function Payment() {
  let formArray = [];
  let numberOfForms = 0;
  const [context, updateContext] = useContext(BookingContext);
  const [customer, setCustomer] = useState();
  const [value, setValue] = React.useState('card');
  var trip = context.dbData.OutboundTrips.filter(function (entry) {
    return entry.train.id === context.SelectedTrain.trainID;
  });
  let tripStops = [];
  trip[0].stops.forEach((element) => tripStops.push(element.id));

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  context.searchData.tickets.forEach((element) => {
    numberOfForms += element.amount;
  });

  if (numberOfForms > 1) {
    for (let i = 1; i < numberOfForms; i++) {
      formArray.push(
        <form className='customer-form'>
          <h3>Resenär {i + 1}</h3>
          <div className='c-form-row'>
            <label htmlFor=''>
              <input
                type='text'
                required
                onChange={(e) => setCustomer({ firstName: e.target.value })}
              />
              <span>Förnamn</span>
            </label>
            <label htmlFor=''>
              <input
                type='text'
                required
                onChange={(e) =>
                  setCustomer({ ...customer, lastName: e.target.value })
                }
              />
              <span>Efternamn</span>
            </label>
          </div>
        </form>
      );
    }
  }

  // Data to save booking to db, not done
  function addBooking() {
    let bookingData = {
      customer: {
        firstName: context.firstname,
        lastName: context.lastname,
        email: context.email,
        phoneNumber: context.phone,
      },
      trainStops: tripStops,
      seats: [
        {
          seatType: context.SelectedTrain.class,
          ticketType: context.searchData.tickets[0].type,
          firstName: context.firstname,
          lastName: context.lastname,
        },
        {
          seatType: context.SelectedTrain.class,
          ticketType: context.searchData.tickets[1].type,
          firstName: customer.firstName,
          lastName: customer.lastName,
        },
      ],
    };
    console.log(bookingData);
  }

  return (
    <div className='container'>
      <h1>BETALSIDA</h1>
      <div className='customer-container'>
        <div className='information-container'>
          <form className='customer-form'>
            <h3>Resenär</h3>
            <div className='c-form-row'>
              <label htmlFor=''>
                <input
                  type='text'
                  required
                  onChange={(e) =>
                    updateContext({
                      firstname: e.target.value,
                    })
                  }
                />
                <span>Förnamn</span>
              </label>
              <label htmlFor=''>
                <input
                  type='text'
                  required
                  onChange={(e) =>
                    updateContext({
                      lastname: e.target.value,
                    })
                  }
                />
                <span>Efternamn</span>
              </label>
            </div>
            <div className='c-form-row'>
              <label htmlFor=''>
                <input
                  type='email'
                  required
                  onChange={(e) =>
                    updateContext({
                      email: e.target.value,
                    })
                  }
                />
                <span>E-postadress</span>
              </label>
              <label htmlFor=''>
                <input
                  type='tel'
                  required
                  pattern='[0-9]{10}'
                  onChange={(e) =>
                    updateContext({
                      phone: e.target.value,
                    })
                  }
                />
                <span>Mobilnummer</span>
              </label>
            </div>
          </form>
          {formArray}
        </div>
      </div>
      <div className='payment-container'>
        <FormControl component='fieldset'>
          <RadioGroup
            name='controlled-radio-buttons-group'
            value={value}
            onChange={handleChange}>
            <FormControlLabel value='card' control={<Radio />} label='Kort' />
            <FormControlLabel value='swish' control={<Radio />} label='Swish' />
            <FormControlLabel
              value='invoice'
              control={<Radio />}
              label='Faktura'
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className='btn-container'>
        <button className='btn btn-success' onClick={() => addBooking()}>
          Fortsätt
        </button>
      </div>
    </div>
  );
}

export default Payment;
