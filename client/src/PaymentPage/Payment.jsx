import React, { useContext, useState } from 'react';
import './Payment.css';
import { BookingContext } from '../Contexts/BookingContext';

function Payment() {
  let formArray = [];
  let tripStopsArr = [];
  let returnTripStopsArr = [];
  let numberOfForms = 0;
  const [context, updateContext] = useContext(BookingContext);
  const [customer, setCustomer] = useState();
  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://train-booking-function-app.azurewebsites.net/api'
      : process.env.REACT_APP_API_URL;
  const [value, setValue] = React.useState('card');

  let tripStops = context.dbData.OutboundTrips.filter(function (entry) {
    return entry.train.id === context.SelectedTrain.trainID;
  });
  if (tripStops.length !== 0) {
    tripStops[0].stops.forEach((element) => tripStopsArr.push(element.id));
  } else {
    tripStopsArr = [];
  }

  if (context.dbData.ReturnTrips) {
    let returnTripStops = context.dbData.ReturnTrips.filter(function (entry) {
      return entry.train.id === context.SelectedTrain.trainID;
    });
    returnTripStops[0].stops.forEach((element) =>
      returnTripStopsArr.push(element.id)
    );
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  context.searchData.tickets.forEach((element) => {
    numberOfForms += element.amount;
  });

  if (numberOfForms > 1) {
    for (let i = 1; i < numberOfForms; i++) {
      formArray.push(
        <form className="customer-form">
          <h3>Resenär {i + 1}</h3>
          <div className="c-form-row">
            <label htmlFor="">
              <input
                type="text"
                required
                onChange={(e) => setCustomer({ firstName: e.target.value })}
              />
              <span>Förnamn</span>
            </label>
            <label htmlFor="">
              <input
                type="text"
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
    const items = [];
    const seatType = context.SelectedTrain.class;
    console.log(context.SelectedTrain.class);
    context.searchData.tickets.forEach((ticket) => {
      if (ticket.type === 'Adult') {
        if (seatType === 'First Class') {
          items.push({ id: 1, quantity: ticket.amount });
        } else if (seatType === 'Second Class') {
          items.push({ id: 2, quantity: ticket.amount });
        } else if (seatType === 'Animal Friendly') {
          items.push({ id: 3, quantity: ticket.amount });
        } else if (seatType === 'Quiet Cart') {
          items.push({ id: 4, quantity: ticket.amount });
        }
      } else if (ticket.type === 'Student') {
        if (seatType === 'First Class') {
          items.push({ id: 5, quantity: ticket.amount });
        } else if (seatType === 'Second Class') {
          items.push({ id: 6, quantity: ticket.amount });
        } else if (seatType === 'Animal Friendly') {
          items.push({ id: 7, quantity: ticket.amount });
        } else if (seatType === 'Quiet Cart') {
          items.push({ id: 8, quantity: ticket.amount });
        }
      } else if (ticket.type === 'Senior') {
        if (seatType === 'First Class') {
          items.push({ id: 9, quantity: ticket.amount });
        } else if (seatType === 'Second Class') {
          items.push({ id: 10, quantity: ticket.amount });
        } else if (seatType === 'Animal Friendly') {
          items.push({ id: 11, quantity: ticket.amount });
        } else if (seatType === 'Quiet Cart') {
          items.push({ id: 12, quantity: ticket.amount });
        }
      } else if (ticket.type === 'Child') {
        if (seatType === 'First Class') {
          items.push({ id: 13, quantity: ticket.amount });
        } else if (seatType === 'Second Class') {
          items.push({ id: 14, quantity: ticket.amount });
        } else if (seatType === 'Animal Friendly') {
          items.push({ id: 15, quantity: ticket.amount });
        } else if (seatType === 'Quiet Cart') {
          items.push({ id: 16, quantity: ticket.amount });
        }
      }
    });

    fetch(API_URL + '/booking/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        items,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then((data) => {
        window.location = data.data.url;
      })
      .catch((e) => {
        console.log(e.error);
      });

    let bookingData = {
      customer: {
        firstName: context.firstname,
        lastName: context.lastname,
        email: context.email,
        phoneNumber: context.phone,
      },
      trainStops: tripStopsArr,
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
    <div className="container">
      <h1>BETALSIDA</h1>
      <div className="customer-container">
        <div className="information-container">
          <form className="customer-form">
            <h3>Resenär</h3>
            <div className="c-form-row">
              <label htmlFor="">
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    updateContext({
                      firstname: e.target.value,
                    })
                  }
                />
                <span>Förnamn</span>
              </label>
              <label htmlFor="">
                <input
                  type="text"
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
            <div className="c-form-row">
              <label htmlFor="">
                <input
                  type="email"
                  required
                  onChange={(e) =>
                    updateContext({
                      email: e.target.value,
                    })
                  }
                />
                <span>E-postadress</span>
              </label>
              <label htmlFor="">
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
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
      {/* <div className="payment-container">
        <FormControl component="fieldset">
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="card" control={<Radio />} label="Kort" />
            <FormControlLabel value="swish" control={<Radio />} label="Swish" />
            <FormControlLabel
              value="invoice"
              control={<Radio />}
              label="Faktura"
            />
          </RadioGroup>
        </FormControl>
      </div> */}
      <div className="btn-container">
        <button className="btn btn-success" onClick={() => addBooking()}>
          Till betalning
        </button>
      </div>
    </div>
  );
}

export default Payment;
