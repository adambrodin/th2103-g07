import React, { useContext, useState, useEffect } from 'react';
import './Payment.css';
import { BookingContext } from '../Contexts/BookingContext';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

function Payment() {
  let nav = useNavigate();
  let formArray = [];
  let tripStopsArr = [];
  let returnTripStopsArr = [];
  let numberOfForms = 0;
  const [context, updateContext] = useContext(BookingContext);
  const [customer, setCustomer] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [summary, setSummary] = useState();
  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://train-booking-function-app.azurewebsites.net/api'
      : process.env.REACT_APP_API_URL;

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

  context.searchData.tickets.forEach((element) => {
    numberOfForms += element.amount;
  });

  useEffect(() => {
    if (!context.searchData.returnTrip) {
      setTotalPrice(context.SelectedTrain.TotalTicketPrice);
      setSummary(
        <>
          <div className='sum-info'>
            <h3>
              {context.searchData.departure.location} -{' '}
              {context.searchData.arrival.location}
            </h3>
            <h4 className="text-center">Tid: {context.SelectedTrain.Time}</h4>
          </div>
        </>
      );
    } else {
      setTotalPrice(
        context.SelectedTrain.TotalTicketPrice +
          context.SelectedReturnTrain.TotalTicketPrice
      );
      setSummary(
        <div className='return-sum'>
          <div className='sum-info'>
            <h4>Utresa</h4>
            <h3>
              {context.searchData.departure.location} -{' '}
              {context.searchData.arrival.location}
            </h3>
            <h3>Tid: {context.SelectedTrain.Time}</h3>
          </div>
          <div className='sum-info'>
            <h4>Återresa</h4>
            <h3>
              {context.searchData.returnDeparture.location} -{' '}
              {context.searchData.returnArrival.location}
            </h3>
            <h3>Tid: {context.SelectedReturnTrain.Time}</h3>
          </div>
        </div>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (numberOfForms > 1) {
    for (let i = 1; i < numberOfForms; i++) {
      formArray.push(
        <>
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
        </>
      );
    }
  }
  $(document).ready(function () {
    $(document).on('submit', '#customer-form', function () {
      addBooking();
      return false;
    });
  });

  // Data to save booking to db, not done
  function addBooking() {
    const items = [];
    const seatType = context.SelectedTrain.class;

    context.searchData.tickets.forEach((ticket) => {
      if (ticket.type === 'Adult') {
        if (seatType === 'FirstClass') {
          items.push({ id: 1, quantity: ticket.amount });
        } else if (seatType === 'SecondClass') {
          items.push({ id: 2, quantity: ticket.amount });
        } else if (seatType === 'AnimalFriendly') {
          items.push({ id: 3, quantity: ticket.amount });
        } else if (seatType === 'QuietCart') {
          items.push({ id: 4, quantity: ticket.amount });
        }
      } else if (ticket.type === 'Student') {
        if (seatType === 'FirstClass') {
          items.push({ id: 5, quantity: ticket.amount });
        } else if (seatType === 'SecondClass') {
          items.push({ id: 6, quantity: ticket.amount });
        } else if (seatType === 'AnimalFriendly') {
          items.push({ id: 7, quantity: ticket.amount });
        } else if (seatType === 'QuietCart') {
          items.push({ id: 8, quantity: ticket.amount });
        }
      } else if (ticket.type === 'Senior') {
        if (seatType === 'FirstClass') {
          items.push({ id: 9, quantity: ticket.amount });
        } else if (seatType === 'SecondClass') {
          items.push({ id: 10, quantity: ticket.amount });
        } else if (seatType === 'AnimalFriendly') {
          items.push({ id: 11, quantity: ticket.amount });
        } else if (seatType === 'QuietCart') {
          items.push({ id: 12, quantity: ticket.amount });
        }
      } else if (ticket.type === 'Child') {
        if (seatType === 'FirstClass') {
          items.push({ id: 13, quantity: ticket.amount });
        } else if (seatType === 'SecondClass') {
          items.push({ id: 14, quantity: ticket.amount });
        } else if (seatType === 'AnimalFriendly') {
          items.push({ id: 15, quantity: ticket.amount });
        } else if (seatType === 'QuietCart') {
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
        items: items,
      }),
    })
      .then((res) => {
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
  }

  function returnPage() {
    if (context.SelectedTrain.class === 'FirstClass') {
      nav('/results');
    } else {
      nav('/additional-choices');
    }
  }

  return (
    <div className='container'>
      <div className="row">

      <div class="card text-center card-width payment-card mt-5">
        <img src="https://previews.123rf.com/images/denisbelitsky/denisbelitsky1707/denisbelitsky170700022/81440808-high-speed-commuter-train-in-motion-at-the-railway-station-at-sunset-in-europe-beautiful-red-modern-.jpg" class="card-img-top img-width" alt="..." />
        <div class="card-body">
           <h5 class="card-title mt-3">{summary}</h5>
            <p class="card-text lead">{'Antal biljetter: ' + numberOfForms}</p>
            <p class="card-text lead">{'Att betala: ' + totalPrice + ':-'}</p>
         </div>
        </div>

      </div>
      <div className='customer-container justify-content-center align-center'>
        <div className='information-container mt-5'>
          <form
            className='customer-form'
            action='#'
            id='customer-form'
            name='paynow'>
            <h3 className="font-color">Resenär</h3>
            <div className='c-form-row'>
              <label htmlFor=''>
                <input
                  type='text'
                  className="font-color"
                  required
                  onChange={(e) =>
                    updateContext({
                      firstname: e.target.value,
                    })
                  }
                />
                <span className="font-color">Förnamn</span>
              </label>
              <label htmlFor=''>
                <input
                  type='text'
                  className="font-color"
                  required
                  onChange={(e) =>
                    updateContext({
                      lastname: e.target.value,
                    })
                  }
                />
                <span className="font-color">Efternamn</span>
              </label>
            </div>
            <div className='c-form-row'>
              <label htmlFor=''>
                <input
                  type='email'
                  className="font-color"
                  required
                  onChange={(e) =>
                    updateContext({
                      email: e.target.value,
                    })
                  }
                />
                <span className="font-color">E-postadress</span>
              </label>
              <label htmlFor=''>
                <input
                  type='tel'
                  className="font-color"
                  required
                  pattern='[0-9]{10}'
                  onChange={(e) =>
                    updateContext({
                      phone: e.target.value,
                    })
                  }
                />
                <span className="font-color">Mobilnummer</span>
              </label>
            </div>
            {formArray}
            <div className='row'>
              <div className="col-md-6">
              <button className='btn m-4 back-button' onClick={returnPage}>
                Tillbaka
              </button>
              </div>
              <div className="col-md-6">
                
              <button className='btn confirm-button m-4' type='submit'>
                {' '}
                Till betalning
              </button>


              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
