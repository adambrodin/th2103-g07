import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <>
      <nav>
        <div className='nav-container'>
          <div className='nav-logo'>
            <Link to='/'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/821/821354.png'
                alt=''
              />
            </Link>
          </div>
          <div className='nav-links'>
            <Link to='/'>Startsida</Link>
            <Link to='/my-bookings'>Mina bokningar</Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
