import { useState, useEffect, useContext } from 'react';
import { TicketType } from '../Enums/ticket-type.enum';
import 'rsuite/dist/rsuite.min.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { BookingContext } from '../Contexts/BookingContext';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'rsuite';

function StartPage() {
  const [returnTrip, setReturnTrip] = useState(false);
  const [adultTicketAmount, setAdultAmount] = useState(1);
  const [studentTicketAmount, setStudentAmount] = useState(0);
  const [seniorTicketAmount, setSeniorAmount] = useState(0);
  const [childTicketAmount, setChildAmount] = useState(0);
  const [stations, setStations] = useState(['']);
  const [bookingContext, updateContext] = useContext(BookingContext);
  let nav = useNavigate();

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://train-booking-function-app.azurewebsites.net/api'
      : (process.env.REACT_APP_API_URL as string);

  useEffect(() => {
    updateContext({
      searchData: {},
    });
    fetchAvailableStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getResults() {
    let allTickets: object[] = [];

    if (!isNaN(adultTicketAmount) && adultTicketAmount > 0) {
      allTickets.push({ type: TicketType.ADULT, amount: adultTicketAmount });
    }
    if (!isNaN(studentTicketAmount) && studentTicketAmount > 0) {
      allTickets.push({
        type: TicketType.STUDENT,
        amount: studentTicketAmount,
      });
    }
    if (!isNaN(seniorTicketAmount) && seniorTicketAmount > 0) {
      allTickets.push({
        type: TicketType.SENIOR,
        amount: seniorTicketAmount,
      });
    }
    if (!isNaN(childTicketAmount) && childTicketAmount > 0) {
      allTickets.push({ type: TicketType.CHILD, amount: childTicketAmount });
    }
    let findTrip;
    if (!returnTrip) {
      findTrip = {
        departure: {
          location: bookingContext.searchData.departure.location,
          time: bookingContext.searchData.departure.time,
        },
        arrival: {
          location: bookingContext.searchData.arrival.location,
          time: bookingContext.searchData.arrival.time,
        },
        tickets: allTickets,
      };
    } else {
      findTrip = {
        departure: {
          location: bookingContext.searchData.departure.location,
          time: bookingContext.searchData.departure.time,
        },
        arrival: {
          location: bookingContext.searchData.arrival.location,
          time: bookingContext.searchData.arrival.time,
        },
        returnDeparture: {
          location: bookingContext.searchData.arrival.location,
          time: bookingContext.searchData.returnDeparture.time,
        },
        returnArrival: {
          location: bookingContext.searchData.departure.location,
        },
        tickets: allTickets,
      };
    }
    fetch(API_URL + '/booking/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(findTrip),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data !== undefined) {
          updateContext({
            dbData: data.data,
            searchData: {
              ...bookingContext.searchData,
              tickets: allTickets,
            },
          });

          nav('/results');
        } else {
          alert(
            'Det finns inga tillgängliga resor mellan dem stationerna som söktes på. Vänligen gör en ny sökning.'
          );
        }
      });
  }

  function toggleDatePicker() {
    setReturnTrip(!returnTrip);
    if (returnTrip) {
      updateContext({
        searchData: {
          arrival: {
            ...bookingContext.searchData.arrival,
          },
          departure: {
            ...bookingContext.searchData.departure,
          },
        },
      });
    }
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
                    onChange={(e, value) => {
                      if (!returnTrip) {
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            departure: {
                              location: value,
                            },
                          },
                        });
                      } else {
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            departure: {
                              location: value,
                            },
                            returnArrival: {
                              location: value,
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
                    onChange={(e, value) => {
                      if (!returnTrip) {
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            arrival: {
                              location: value,
                            },
                          },
                        });
                      } else {
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            arrival: {
                              location: value,
                            },
                            returnDeparture: {
                              location: value,
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
                    Återresa
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
                    <DatePicker
                      format='yyyy-MM-dd HH:mm'
                      style={{ width: 200 }}
                      onChange={(e) =>
                        updateContext({
                          searchData: {
                            ...bookingContext.searchData,
                            departure: {
                              ...bookingContext.searchData.departure,
                              time: e.toISOString(),
                            },
                          },
                        })
                      }
                    />
                    <span id='returnDate'>
                      <DatePicker
                        format='yyyy-MM-dd HH:mm'
                        style={{ width: 200 }}
                        onChange={(e) =>
                          updateContext({
                            searchData: {
                              ...bookingContext.searchData,
                              returnDeparture: {
                                ...bookingContext.searchData.arrival,
                                time: e.toISOString(),
                              },
                              returnArrival: {
                                ...bookingContext.searchData.departure,
                              },
                              returnTrip: returnTrip,
                            },
                          })
                        }
                      />
                    </span>
                  </>
                </div>
                <div>
                  <label htmlFor=''>Vuxen</label>
                  <input
                    type='number'
                    name=''
                    id='adultTickets'
                    min='0'
                    value={adultTicketAmount}
                    onChange={(e: any) =>
                      setAdultAmount(parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label htmlFor=''>Ungdom/Student (18-25 år)</label>
                  <input
                    type='number'
                    name=''
                    id='studentTickets'
                    min='0'
                    value={studentTicketAmount}
                    onChange={(e: any) =>
                      setStudentAmount(parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label htmlFor=''>Pensionär (65+ år)</label>
                  <input
                    type='number'
                    name=''
                    id='pensionerTickets'
                    min='0'
                    value={seniorTicketAmount}
                    onChange={(e: any) =>
                      setSeniorAmount(parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label htmlFor=''>Barn (0-17 år)</label>
                  <input
                    type='number'
                    name=''
                    id='kidsTicket'
                    min='0'
                    value={childTicketAmount}
                    onChange={(e: any) =>
                      setChildAmount(parseInt(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button className='btn btn-success' onClick={() => getResults()}>
        Fortsätt
      </button>
    </div>
  );
}

export default StartPage;
