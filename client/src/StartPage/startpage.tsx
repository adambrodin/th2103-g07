import { useState, useEffect, useContext } from 'react';
import { TicketType } from '../Enums/ticket-type.enum';
import 'rsuite/dist/rsuite.min.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { BookingContext } from '../Contexts/BookingContext';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'rsuite';
import './startpage.css';

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
    <>
      <div className='bg-img d-none d-md-block'></div>
      <div className='container text-center'>
        <div id='SearchContainer' className='row mt-5'>
          <h2 className='mb-3 test text-light'>Hej, Vart vill du resa?</h2>
          <div className='justify-content-center'>
            <form>
              <div className='form-row'>
                <div className='form-group col-md-8 mx-auto '>
                  <div
                    id='startForm'
                    className='input-group mt-5 row justify-content-around'>
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
                          label='Avresestation'
                          variant='filled'
                        />
                      )}
                    />
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
                          label='Ankomststation'
                          variant='filled'
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className='form-row spaceing'>
                <div className='form-group col-md-8 mx-auto'>
                  <div className='form-check form form-check-inline row justify-content-center '>
                    <input
                      className='form-check-input mt-2'
                      type='checkbox'
                      name='returnTrip'
                      id='returnTrip'
                      onChange={() => toggleDatePicker()}
                    />
                    <label
                      className='form-check-lable lead'
                      htmlFor='returnTrip'>
                      Återresa
                    </label>
                  </div>

                  <div className='mt-3' id='timeSelectContainer'>
                    <>
                      <DatePicker
                        placeholder='Välj datum för avresa'
                        className='datePicker'
                        format='yyyy-MM-dd HH:mm'
                        isoWeek
                        locale={{
                          sunday: 'Sön',
                          monday: 'Mån',
                          tuesday: 'Tis',
                          wednesday: 'Ons',
                          thursday: 'Tors',
                          friday: 'Fre',
                          saturday: 'Lör',
                          ok: 'OK',
                          today: 'Idag',
                          yesterday: 'Igår',
                          hours: 'Timme',
                          minutes: 'Minut',
                        }}
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
                          placeholder='Välj datum för återresa'
                          format='yyyy-MM-dd HH:mm'
                          isoWeek
                          locale={{
                            sunday: 'Sön',
                            monday: 'Mån',
                            tuesday: 'Tis',
                            wednesday: 'Ons',
                            thursday: 'Tors',
                            friday: 'Fre',
                            saturday: 'Lör',
                            ok: 'OK',
                            today: 'Idag',
                            yesterday: 'Igår',
                            hours: 'Timme',
                            minutes: 'Minut',
                          }}
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
                  <div className='row'>
                    <div className='col-md-6'>
                      <label className='mt-3 lead' htmlFor=''>
                        Vuxen
                      </label>
                    </div>
                    <div className='col-md-6'>
                      <input
                        className='mt-3 text-light'
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
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label className='mt-3 lead' htmlFor=''>
                        Ungdom/Student (18-25 år)
                      </label>
                    </div>
                    <div className='col-md-6'>
                      <input
                        className='mt-3 text-light'
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
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label className='mt-3 lead' htmlFor=''>
                        Pensionär (65+ år)
                      </label>
                    </div>
                    <div className='col-md-6'>
                      <input
                        className='mt-3 text-light'
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
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <label className='mt-3 lead' htmlFor=''>
                        Barn (0-17 år)
                      </label>
                    </div>
                    <div className='col-md-6'>
                      <input
                        className='mt-3 text-light'
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
              </div>
            </form>
          </div>
        </div>
        <button
          className='btn confirm-button mt-3'
          onClick={() => getResults()}>
          Fortsätt
        </button>
      </div>
    </>
  );
}

export default StartPage;
