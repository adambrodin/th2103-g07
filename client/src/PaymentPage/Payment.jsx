import React, { useContext, useState } from 'react';
import './Payment.css';
import { BookingContext } from '../Contexts/BookingContext';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function Payment() {
  let formArray = [];
  const [context, updateContext] = useContext(BookingContext);
  const [customer, setCustomer] = useState();
  const [value, setValue] = React.useState('card');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // Check if it's more than 1 ticket
  if (context.tickets[0].amount > 1) {
    for (let i = 1; i < context.tickets[0].amount; i++) {
      formArray.push(
        <form className='customer-form'>
          <h3>Resenär {i + 1}</h3>
          <div className='c-form-row'>
            <label htmlFor=''>
              <input
                type='text'
                required
                onChange={(e) => setCustomer({ firstname: e.target.value })}
              />
              <span>Förnamn</span>
            </label>
            <label htmlFor=''>
              <input
                type='text'
                required
                onChange={(e) =>
                  setCustomer({ ...customer, lastname: e.target.value })
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
    // let data = {
    //   customer: {
    //     firstName: context.firstname,
    //     lastName: context.lastname,
    //     email: context.email,
    //     phoneNumber: context.phone,
    //   },
    //   train: {
    //     id: '1',
    //     name: 'X2000',
    //   },
    //   seats: [
    //     {
    //       seat: 'Regular',
    //       ticket: 'Adult',
    //     },
    //   ],
    // };
    alert('Redirect');
  }

  return (
    <div className='container'>
      <h1>BETALSIDA</h1>
      <div className='summary-container'>
        <div>
          <h3>
            {context.departure.location} - {context.arrival.location}
          </h3>
          <h5>
            {context.departure.time} - {context.arrival.time}
          </h5>
          <h5>Antal biljetter: {context.tickets[0].amount}</h5>
          <h5>Att betala: {context.price}:- </h5>
        </div>
      </div>
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
            {/* Remove input after testing */}
            <input type='submit' />
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