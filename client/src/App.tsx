import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage/startpage';
import Payment from './PaymentPage/Payment';
import AdditionalChoicesPage from './AdditionalChoicesPage/AdditionalChoicesPage';
import Navbar from './Components/Navbar';
import ResultComponent from './Resultpage/ResultComponent';

function App() {
  return (
    <>
      {/* <StartPage /> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/results' element={<ResultComponent />} />
          <Route
            path='/additional-choices'
            element={<AdditionalChoicesPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
