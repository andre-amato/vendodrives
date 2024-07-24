import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import racingFlag from '../assets/racing-flag.png';

const Header = ({ showNavLinks = true }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className='bg-blue-600 text-white p-6 flex justify-between items-center sticky top-0 shadow-md z-30'>
      <div className='flex items-center space-x-6'>
        <img
          src={racingFlag}
          //original src={<a href="https://pt.vecteezy.com/png/1209683-corrida-de-bandeira">bandeira de corrida PNGs por Vecteezy</a>}
          alt='Racing Flag'
          className='w-20 h-12'
          style={{
            filter:
              'invert(100%) sepia(0%) saturate(0%) hue-rotate(360deg) brightness(100%) contrast(100%)',
          }}
        />
        <h1 className='text-4xl font-bold font-bebas'>VendoDrives</h1>
      </div>
      {showNavLinks && (
        <div className='flex space-x-6'>
          {location.pathname === '/messages' ? (
            <Link to='/main' className='hover:underline'>
              Main
            </Link>
          ) : (
            <Link to='/messages' className='hover:underline'>
              Messages
            </Link>
          )}
          <button onClick={handleLogout} className='hover:underline'>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  showNavLinks: PropTypes.bool,
};

export default Header;
