import { createContext, useState } from 'react';

export const BookingContext = createContext();
function BookingContextProvider(props) {
  const [context, setContext] = useState([]);

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
