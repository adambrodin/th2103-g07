import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage/startpage';
import Payment from './PaymentPage/Payment';

function App() {
  return (
    <>
      {/* <StartPage /> */}
      <Router>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/payment' element={<Payment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
