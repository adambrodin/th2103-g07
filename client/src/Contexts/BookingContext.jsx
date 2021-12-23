import { createContext, useState } from 'react';

export const BookingContext = createContext();
function BookingContextProvider(props) {
  const [context, setContext] = useState({
    departure: {
      location: 'Göteborg C',
      time: '2021-12-28 14:00',
    },
    arrival: {
      location: 'Stockholm Central',
      time: '2021-12-28 17:00',
    },
    tickets: [{ type: 'Adult', amount: 3 }],
    price: 495,
    additionalCosts: 0,
  });

  function updateContext(values) {
    setContext({
      ...context,
      ...values,
    });
  }

  return (
    <BookingContext.Provider value={[context, updateContext]}>
      {props.children}
    </BookingContext.Provider>
  );
}

export default BookingContextProvider;
