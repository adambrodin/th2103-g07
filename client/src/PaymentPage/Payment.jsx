import { useContext, useState, useEffect } from 'react';
import './Payment.css';
import { BookingContext } from '../Contexts/BookingContext';
import { useNavigate } from 'react-router-dom';

function Payment() {
  let passengers = [];
  let nav = useNavigate();
  let formArray = [];
  let numberOfForms = 0;
  let customerFirst;
  let customerLast;
  let customerEmail;
  let customerPhone;
  let paymentPending = false;

  const [context] = useContext(BookingContext);
  const [totalPrice, setTotalPrice] = useState();
  const [summary, setSummary] = useState();
  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://train-booking-function-app.azurewebsites.net/api'
      : process.env.REACT_APP_API_URL;

  console.log('Context:', context);
  context.searchData.tickets.forEach((element) => {
    numberOfForms += element.amount;
  });

  useEffect(() => {
    if (!context.searchData.returnTrip) {
      setTotalPrice(context.SelectedTrain.TotalTicketPrice);
      setSummary(
        <>
          <div className="sum-info">
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
        <div className="return-sum">
          <div className="sum-info">
            <h4>Utresa</h4>
            <h3>
              {context.searchData.departure.location} -{' '}
              {context.searchData.arrival.location}
            </h3>
            <h3>Tid: {context.SelectedTrain.Time}</h3>
          </div>
          <div className="sum-info">
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
    for (let i = 0; i < numberOfForms - 1; i++) {
      formArray.push(
        <>
          <h3 className="font-color">Resenär {i + 1}</h3>
          <div className="c-form-row font-color">
            <label htmlFor="">
              <input
                type="text"
                className="input-color"
                required
                onBlur={(e) => {
                  passengers[i] = { firstName: e.target.value };
                }}
              />
              <span>Förnamn</span>
            </label>
            <label htmlFor="">
              <input
                type="text"
                required
                className="input-color"
                onBlur={(e) => {
                  passengers[i] = {
                    firstName: passengers[i].firstName,
                    lastName: e.target.value,
                  };
                }}
              />
              <span>Efternamn</span>
            </label>
          </div>
        </>
      );
    }
  }

  // Data to save booking to db, not done
  async function addBooking(e) {
    e.preventDefault();
    if (!paymentPending) {
      const items = [];
      const seatType = context.SelectedTrain.class;

      context.searchData.tickets.forEach((ticket) => {
        if (context?.searchData?.returnTrip) {
          ticket.amount *= 2;
        }

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

      const tickets = [];
      for (let i = 0; i < context?.searchData?.tickets.length; i++) {
        tickets.push({
          ticketType: context?.searchData?.tickets[i].type,
          seatType: context?.SelectedTrain?.class,
          firstName: i === 0 ? customerFirst : passengers[i - 1].firstName,
          lastName: i === 0 ? customerLast : passengers[i - 1].lastName,
        });
      }

      const selectedOutbound = context.dbData?.OutboundTrips.filter(
        (trip) => trip.train.id === context.SelectedTrain.trainID
      )[0];

      const outboundStops = [];
      outboundStops.push(selectedOutbound.departure.id);
      for (const stop of context.SelectedTrain.stops) {
        outboundStops.push(stop.id);
      }
      outboundStops.push(selectedOutbound.arrival.id);

      paymentPending = true;
      const outboundBooking = await fetch(API_URL + '/booking/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          customer: {
            firstName: customerFirst,
            lastName: customerLast,
            email: customerEmail,
            phoneNumber: customerPhone,
          },
          trainStops: outboundStops,
          seats: tickets,
        }),
      });

      let returnBooking;
      if (context?.searchData?.returnTrip) {
        const selectedReturn = context.dbData?.ReturnTrips?.filter(
          (trip) => trip.train.id === context.SelectedReturnTrain.trainID
        )[0];

        const returnStops = [];
        returnStops.push(selectedReturn.departure.id);
        for (const stop of context.SelectedReturnTrain.stops) {
          returnStops.push(stop.id);
        }
        returnStops.push(selectedReturn.arrival.id);

        returnBooking = await fetch(API_URL + '/booking/reservation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            customer: {
              firstName: customerFirst,
              lastName: customerLast,
              email: customerEmail,
              phoneNumber: customerPhone,
            },
            trainStops: returnStops,
            seats: tickets,
          }),
        });
      }

      const parsedOutbound = await outboundBooking.json();
      const parsedReturn = await returnBooking?.json();
      fetch(API_URL + '/booking/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          items: items,
          outboundBookingId: parsedOutbound.data.booking.id,
          returnBookingId:
            parsedReturn != null ? parsedReturn?.data?.booking?.id : null,
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            return res.json();
          } else {
            const json = await res.json();
            return await Promise.reject(json);
          }
        })
        .then((data) => {
          window.location = data.data.url;
        })
        .catch((e) => {
          console.log('Fetch checkout-session error:', e.error);
        });
    }
  }

  function returnPage() {
    if (context.SelectedTrain.class === 'First Class') {
      nav('/results');
    } else {
      nav('/additional-choices');
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card text-center card-width payment-card mt-5">
          <img
            src="https://previews.123rf.com/images/denisbelitsky/denisbelitsky1707/denisbelitsky170700022/81440808-high-speed-commuter-train-in-motion-at-the-railway-station-at-sunset-in-europe-beautiful-red-modern-.jpg"
            class="card-img-top img-width"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title mt-3">{summary}</h5>
            <p class="card-text lead">{'Antal biljetter: ' + numberOfForms}</p>
            <p class="card-text lead">{'Att betala: ' + totalPrice + ':-'}</p>
          </div>
        </div>
      </div>
      <div className="customer-container ">
        <div className="information-container mt-5">
          <form
            className="customer-form"
            action="#"
            id="customer-form"
            name="paynow"
          >
            <h3 className="font-color">Resenär</h3>
            <div className="c-form-row">
              <label htmlFor="">
                <input
                  type="text"
                  className="input-color"
                  required
                  onBlur={(e) => (customerFirst = e.target.value)}
                />
                <span className="font-color">Förnamn</span>
              </label>
              <label htmlFor="">
                <input
                  type="text"
                  className="input-color"
                  required
                  onBlur={(e) => (customerLast = e.target.value)}
                />
                <span className="font-color">Efternamn</span>
              </label>
            </div>
            <div className="c-form-row">
              <label htmlFor="">
                <input
                  type="email"
                  className="input-color"
                  required
                  onBlur={(e) => (customerEmail = e.target.value)}
                />
                <span className="font-color">E-postadress</span>
              </label>
              <label htmlFor="">
                <input
                  type="tel"
                  className="input-color"
                  required
                  pattern="[0-9]{10}"
                  onBlur={(e) => (customerPhone = e.target.value)}
                />
                <span className="font-color">Mobilnummer</span>
              </label>
            </div>
            {formArray}
            <div className="row">
              <div className="col-md-6">
                <button className="btn m-4 back-button" onClick={returnPage}>
                  Tillbaka
                </button>
              </div>
              <div className="col-md-6">
                <button
                  className="btn confirm-button m-4"
                  onClick={(e) => addBooking(e)}
                  type="submit"
                >
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
