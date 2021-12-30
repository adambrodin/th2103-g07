import moment from 'moment';
import 'rsuite/dist/rsuite.min.css';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookingContext } from '../Contexts/BookingContext';

function ResultComponent() {
  let nav = useNavigate();
  const [bookingContext, updateContext] = useContext(BookingContext);
  let lastSelectedDepartTrip: HTMLElement | null = null;
  let lastSelectedReturnTrip: HTMLElement | null = null;
  const ticketPrices: number = getTicketPrices();
  let lastSelectedTripId: string = '';
  let lastSelectedReturnTripId: string = '';

  function getTicketPrices(): number {
    let ticketsPrice: number = 0;
    bookingContext.searchData.tickets.forEach((ticket) => {
      if (ticket.type === 'Adult') {
        ticketsPrice = 500 * ticket.amount;
      } else if (ticket.type === 'Student') {
        ticketsPrice = ticketsPrice + 200 * ticket.amount;
      } else if (ticket.type === 'Senior') {
        ticketsPrice = ticketsPrice + 200 * ticket.amount;
      } else if (ticket.type === 'Child') {
        ticketsPrice = ticketsPrice + 100 * ticket.amount;
      }
    });
    return ticketsPrice;
  }

  function getTicket(DepartId: string, returnId: string) {
    // Get train object from id

    let currentDepartTrip = document.getElementById(DepartId);
    let currentReturnTrip;
    if (returnId) {
      currentReturnTrip = document.getElementById(returnId);
    }

    if (lastSelectedDepartTrip != null && currentDepartTrip != null) {
      lastSelectedDepartTrip.classList.remove('selectedTicket');
    }
    if (lastSelectedReturnTrip != null && currentReturnTrip != null) {
      lastSelectedReturnTrip.classList.remove('selectedTicket');
    }

    if (currentDepartTrip != null) {
      currentDepartTrip.classList.add('selectedTicket');
    }
    if (currentReturnTrip != null) {
      currentReturnTrip.classList.add('selectedTicket');
    }

    if (currentDepartTrip != null) {
      lastSelectedDepartTrip = currentDepartTrip;
    }
    if (currentReturnTrip != null) {
      lastSelectedReturnTrip = currentReturnTrip;
    }
  }

  function toggleRadio(e: any) {
    const Id = e.target.id.split('-');

    if (Id[0] === 'SecondClass') {
      updateContext({
        ...bookingContext,
        SelectedTrain: {
          class: Id[0],
          trainID: Id[1],
          Time: document.getElementById(Id[1])?.textContent?.slice(0, 13),
          TotalTicketPrice: ticketPrices,
        },
      });
    } else {
      updateContext({
        ...bookingContext,
        SelectedTrain: {
          class: Id[0],
          trainID: Id[1],
          Time: document.getElementById(Id[1])?.textContent?.slice(0, 13),
          TotalTicketPrice: ticketPrices * 2,
        },
      });
    }

    if (e.target.id !== 'SecondClass-' + Id[1]) {
      let esh: any = document.getElementById('SecondClass-' + Id[1]);
      esh.checked = false;
    } else if (e.target.id !== 'FirstClass-' + Id[1]) {
      let esh: any = document.getElementById('FirstClass-' + Id[1]);
      esh.checked = false;
    }
    if (lastSelectedTripId !== e.target.id && lastSelectedTripId !== '') {
      let esh: any = document.getElementById(lastSelectedTripId);
      esh.checked = false;
    }

    lastSelectedTripId = e.target.id;
  }
  function toggleReturnRadio(e: any) {
    const Id = e.target.id.split('-');

    if (Id[0] === 'SecondClass') {
      updateContext({
        ...bookingContext,
        SelectedReturnTrain: {
          class: Id[0],
          trainID: Id[1],
          Time: document.getElementById(Id[1])?.textContent?.slice(0, 13),
          TotalTicketPrice: ticketPrices,
        },
      });
    } else {
      updateContext({
        ...bookingContext,
        SelectedReturnTrain: {
          class: Id[0],
          trainID: Id[1],
          Time: document.getElementById(Id[1])?.textContent?.slice(0, 13),
          TotalTicketPrice: ticketPrices * 2,
        },
      });
    }

    if (e.target.id !== 'ReturnSecondClass-' + Id[1]) {
      let esh: any = document.getElementById('ReturnSecondClass-' + Id[1]);
      esh.checked = false;
    } else if (e.target.id !== 'ReturnFirstClass-' + Id[1]) {
      let esh: any = document.getElementById('ReturnFirstClass-' + Id[1]);
      esh.checked = false;
    }
    if (
      lastSelectedReturnTripId !== e.target.id &&
      lastSelectedReturnTripId !== ''
    ) {
      let esh: any = document.getElementById(lastSelectedReturnTripId);
      esh.checked = false;
    }

    lastSelectedReturnTripId = e.target.id;
  }

  function nextPage() {
    nav('/additional-choices');
  }
  console.log(bookingContext);

  return (
    <>
      <Link to='/'>
        <button className='btn btn-secondary'>Tillbaka</button>
      </Link>
      <div className='container text-center'>
        <div id='searchResults'>
          <h2>Utresa</h2>
          <p>
            {bookingContext.searchData.departure.location} -{' '}
            {bookingContext.searchData.arrival.location}
          </p>
          <p>
            {moment(bookingContext.searchData.departure.time).format(
              'Do MMMM YYYY'
            )}
          </p>
          <table id='departTrip' className='table'>
            <thead className='thead-dark'>
              <tr>
                <th>Tid</th>
                <th>1 klass</th>
                <th>2 klass</th>
              </tr>
            </thead>
            <tbody>
              {bookingContext.dbData.OutboundTrips.map((trip: any) => {
                return (
                  <tr
                    onClick={() => getTicket(trip.train.id, '')}
                    id={trip.train.id}
                    key={trip.train.id}>
                    <td>
                      {moment(trip.departure.time).format('HH:mm')} -{' '}
                      {moment(trip.arrival.time).format('HH:mm')}
                      <p>
                        restid
                        {' ' +
                          moment
                            .duration(
                              moment(trip.departure.time).diff(
                                moment(trip.arrival.time)
                              )
                            )
                            .humanize()}
                      </p>
                    </td>
                    <td>
                      <label htmlFor={'FirstClass-' + trip.train.id}>
                        {ticketPrices * 2 + ' kr'}
                      </label>
                      <input
                        type='radio'
                        name={'FirstClass-' + trip.train.id}
                        id={'FirstClass-' + trip.train.id}
                        onChange={(e) => toggleRadio(e)}
                      />
                    </td>
                    <td>
                      <label htmlFor={'SecondClass-' + trip.train.id}>
                        {ticketPrices + ' kr'}
                      </label>
                      <input
                        type='radio'
                        name={'SecondClass-' + trip.train.id}
                        id={'SecondClass-' + trip.train.id}
                        onChange={(e) => toggleRadio(e)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {bookingContext.searchData.returnTrip ? (
            <>
              <h2>Återresa</h2>
              <p>
                {bookingContext.searchData.returnDeparture.location} -{' '}
                {bookingContext.searchData.returnArrival.location}
              </p>
              <p>
                {moment(bookingContext.searchData.returnDeparture.time).format(
                  'Do MMMM YYYY'
                )}
              </p>
              <table id='returnTrip' className='table'>
                <thead className='thead-dark'>
                  <tr>
                    <th>Tid</th>
                    <th>1 klass</th>
                    <th>2 klass</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingContext.dbData.ReturnTrips.map((trip: any) => (
                    <tr
                      onClick={() => getTicket(trip.train.id, '')}
                      id={trip.train.id}
                      key={trip.train.id}>
                      <td>
                        {moment(trip.departure.time).format('HH:mm')} -{' '}
                        {moment(trip.arrival.time).format('HH:mm')}
                        <p>
                          restid
                          {' ' +
                            moment
                              .duration(
                                moment(trip.departure.time).diff(
                                  moment(trip.arrival.time)
                                )
                              )
                              .humanize()}
                        </p>
                      </td>
                      <td>
                        <label htmlFor={'FirstClass-' + trip.train.id}>
                          {ticketPrices * 2 + ' kr'}
                        </label>
                        <input
                          type='radio'
                          name={'FirstClass-' + trip.train.id}
                          id={'ReturnFirstClass-' + trip.train.id}
                          onChange={(e) => toggleReturnRadio(e)}
                        />
                      </td>
                      <td>
                        <label htmlFor={'FirstClass-' + trip.train.id}>
                          {ticketPrices + ' kr'}
                        </label>
                        <input
                          type='radio'
                          name={'SecondClass-' + trip.train.id}
                          id={'ReturnSecondClass-' + trip.train.id}
                          onChange={(e) => toggleReturnRadio(e)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <></>
          )}
          <div className='col'>
            <button
              id='continueButton'
              className='btn btn-success float-right'
              onClick={nextPage}>
              Fortsätt
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultComponent;
