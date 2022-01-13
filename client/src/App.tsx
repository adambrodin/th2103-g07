import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage/startpage';
import Payment from './PaymentPage/Payment';
import AdditionalChoicesPage from './AdditionalChoicesPage/AdditionalChoicesPage';
import Navbar from './Components/Navbar';
import ResultComponent from './Resultpage/ResultComponent';
import SuccessPage from './SuccessPaymentPage/successPage';
import CanceledPage from './CanceledPaymentPage/canceledPage';
import AccessBookingPage from './MyBookingsPage/MyBookingsPage';
import { useContext } from 'react';
import { BookingContext } from './Contexts/BookingContext';

function App() {
  const [bookingContext] = useContext(BookingContext);
  const test = bookingContext;

  return (
    <>
      {/* <StartPage /> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/results" element={<ResultComponent data={test} />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/canceled" element={<CanceledPage />} />
          <Route
            path="/additional-choices"
            element={<AdditionalChoicesPage />}
          ></Route>
          <Route path="/my-bookings" element={<AccessBookingPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
