import React, {createContext, useState} from 'react'
import StartPage from './StartPage/startpage';
import AdditionalChoicesPage from './AdditionalChoicesPage/AdditionalChoicesPage'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';

function App() {

  return(
  <div className="App">
      <h1>Train Booking System - Group 7</h1>;
  <Router>
    <Routes>
      <Route path="/" element={<StartPage/>}>
        <Route path="tillval" element={<AdditionalChoicesPage/>}></Route>
        {/* Example of nested routing
          <Route path="booking" element={<BookingPage/>}></Route>
          */}
      </Route>
    </Routes>
  </Router>

</div>)
}

export default App;
