import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage/startpage';
import Payment from './PaymentPage/Payment';
import AdditionalChoicesPage from './AdditionalChoicesPage/AdditionalChoicesPage'
import AccessBookingPage from './MyBookingsPage/MyBookingsPage';

function App() {
  return (
    <>
      {/* <StartPage /> */}
      <Router>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/additional-choices' element={<AdditionalChoicesPage/>}></Route>
          <Route path='/my-bookings' element={<AccessBookingPage/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
