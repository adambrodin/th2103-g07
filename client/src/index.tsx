import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BookingContextProvider from './Contexts/BookingContext';
require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <BookingContextProvider>
      <App />
    </BookingContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
