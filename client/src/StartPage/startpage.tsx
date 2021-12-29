import { useState, useEffect, useContext } from 'react';
import { TicketType } from '../Enums/ticket-type.enum';
import 'rsuite/dist/rsuite.min.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { BookingContext } from '../Contexts/BookingContext';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const [returnTrip, setReturnTrip] = useState(false);
  const [stations, setStations] = useState(['']);
  const [bookingContext, updateContext] = useContext(BookingContext);
  let nav = useNavigate();

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://train-booking-function-app.azurewebsites.net/api'
      : (process.env.REACT_APP_API_URL as string);

  useEffect(() => {
    fetchAvailableStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getResults() {
    fetch(API_URL + '/booking/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(bookingContext.searchData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data !== undefined) {
          updateContext({ dbData: data.data });
          nav('/results');
        } else {
          alert(
            'Det finns inga tillgängliga resor mellan dem stationerna som söktes på. Vänligen gör en ny sökning.'
          );
        }
      });
  }

  function toggleDatePicker() {
    if (returnTrip) {
      updateContext({
        searchData: {
          arrival: {
            ...bookingContext.searchData.arrival,
          },
          departure: {
            ...bookingContext.searchData.departure,
          },
          tickets: [...bookingContext.searchData.tickets],
        },
      });
    }
    setReturnTrip(!returnTrip);
    let x = document.getElementById('returnDate');

    if (x!.style.display === 'inline') {
      x!.style.display = 'none';
    } else {
      x!.style.display = 'inline';
    }
  }

  function fetchAvailableStations() {
    fetch(API_URL + '/station', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const stationNames: string[] = [];
        for (let station of data) {
          stationNames.push(station.locationName);
        }

        setStations(stations.concat(stationNames));
      });
  }

  return (
    <div className='container text-center'>
      <div className='row'>
        <h1>Tåg bokningssystem - Group 7</h1>
      </div>
      <div id='SearchContainer' className='row mt-5'>
        <h2>Hej, Vart vill du resa?</h2>
        <div className='justify-content-center'>
          <form>
            <div className='form-row'>
              <div className='form-group col-md-8 mx-auto'>
                <div id='startForm' className='input-group'>
                  <label className='input-group-text' htmlFor='fromDestination'>
                    Från
                  </label>
                  <Autocomplete
                    options={stations}
                    style={{ width: 300 }}
                    onChange={(e) => {
                      if (!returnTrip) {
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            departure: {
                              location: (e.target as HTMLInputElement)
                                .innerHTML,
                            },
                          },
                        });
                      } else {
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            departure: {
                              location: (e.target as HTMLInputElement)
                                .innerHTML,
                            },
                            returnArrival: {
                              location: (e.target as HTMLInputElement)
                                .innerHTML,
                            },
                          },
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        className='fromDestination'
                        {...params}
                        label='Sök efter stationer'
                        variant='outlined'
                      />
                    )}
                  />
                  <label className='input-group-text' htmlFor='toDestination'>
                    Till
                  </label>
                  <Autocomplete
                    options={stations}
                    style={{ width: 300 }}
                    onChange={(e) => {
                      if (!returnTrip) {
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            arrival: {
                              location: (e.target as HTMLInputElement)
                                .innerHTML,
                            },
                          },
                        });
                      } else {
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            arrival: {
                              location: (e.target as HTMLInputElement)
                                .innerHTML,
                            },
                            returnDeparture: {
                              location: (e.target as HTMLInputElement)
                                .innerHTML,
                            },
                          },
                        });
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        className='toDestination'
                        {...params}
                        label='Sök efter stationer'
                        variant='outlined'
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-8 mx-auto'>
                <div className='form-check form form-check-inline'>
                  <label className='form-check-lable' htmlFor='returnTrip'>
                    Åter resa
                  </label>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='returnTrip'
                    id='returnTrip'
                    onChange={() => toggleDatePicker()}
                  />
                </div>
                <div id='timeSelectContainer'>
                  <>
                    <input
                      type='datetime-local'
                      id='start'
                      name='trip-start'
                      min='2018-01-01'
                      max='2023-12-31'
                      onChange={(e) =>
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            departure: {
                              ...bookingContext.searchData.departure,
                              time: (e.target as HTMLInputElement).value,
                            },
                          },
                        })
                      }></input>
                    <input
                      type='datetime-local'
                      id='returnDate'
                      name='trip-start'
                      min='2018-01-01'
                      max='2023-12-31'
                      onChange={(e) =>
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            returnDeparture: {
                              ...bookingContext.searchData.arrival,
                              time: (e.target as HTMLInputElement).value,
                            },
                            returnArrival: {
                              ...bookingContext.searchData.departure,
                            },
                            returnTrip: returnTrip,
                          },
                        })
                      }></input>
                  </>
                </div>
                <div>
                  <label htmlFor=''>Vuxen</label>
                  <input
                    type='number'
                    name=''
                    id='adultTickets'
                    min='0'
                    onChange={(e: any) =>
                      updateContext({
                        searchData: {
                          ...bookingContext.searchData,
                          tickets: [
                            {
                              type: TicketType.ADULT,
                              amount: parseInt(e.target.value),
                            },
                          ],
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor=''>Ungdom/Student</label>
                  <input
                    type='number'
                    name=''
                    id='studentTickets'
                    min='0'
                    onChange={(e: any) =>
                      updateContext({
                        searchData: {
                          ...bookingContext.searchData,
                          tickets: [
                            ...bookingContext.searchData.tickets,
                            {
                              type: TicketType.STUDENT,
                              amount: parseInt(e.target.value),
                            },
                          ],
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor=''>Pensionär</label>
                  <input
                    type='number'
                    name=''
                    id='pensionerTickets'
                    min='0'
                    onChange={(e: any) =>
                      updateContext({
                        searchData: {
                          ...bookingContext.searchData,
                          tickets: [
                            ...bookingContext.searchData.tickets,
                            {
                              type: TicketType.SENIOR,
                              amount: parseInt(e.target.value),
                            },
                          ],
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor=''>Barn</label>
                  <input
                    type='number'
                    name=''
                    id='kidsTicket'
                    min='0'
                    onChange={(e: any) =>
                      updateContext({
                        searchData: {
                          ...bookingContext.searchData,
                          tickets: [
                            ...bookingContext.searchData.tickets,
                            {
                              type: TicketType.CHILD,
                              amount: parseInt(e.target.value),
                            },
                          ],
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button onClick={() => getResults()}>Fortsätt</button>
    </div>
  );
}

export default StartPage;
