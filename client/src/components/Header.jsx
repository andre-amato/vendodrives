import { Link, useNavigate, useLocation } from 'react-router-dom';
import racingFlag from '../assets/racing-flag.png';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Header = ({ showNavLinks = true, onSearch = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const isOnMainPage = location.pathname === '/main';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='bg-blue-600 text-white p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center sticky top-0 shadow-md z-30'>
      <div className='flex items-center space-x-4 sm:space-x-6'>
        <img
          src={racingFlag}
          alt='Racing Flag'
          className='w-16 h-10 sm:w-24 sm:h-14'
          style={{
            filter:
              'invert(100%) sepia(0%) saturate(0%) hue-rotate(360deg) brightness(100%) contrast(100%)',
          }}
        />
        <h1 className='text-xl sm:text-3xl font-bold font-bebas'>
          VendoDrives
        </h1>
      </div>
      {showNavLinks && (
        <nav className='w-full sm:w-auto'>
          <div className='flex justify-end sm:hidden'>
            <button
              onClick={toggleMenu}
              className='text-3xl focus:outline-none'
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          <div
            className={`flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 ${
              isMenuOpen ? 'flex' : 'hidden'
            } sm:flex`}
          >
            {isOnMainPage ? (
              <>
                <input
                  type='text'
                  placeholder='Search...'
                  className='mt-2 sm:mt-0 px-4 py-2 border border-gray-300 rounded w-full sm:w-auto text-black'
                  onChange={handleSearchChange}
                />
                <Link
                  to='/messages'
                  className='text-lg sm:text-xl hover:underline'
                >
                  Messages
                </Link>
              </>
            ) : (
              <Link to='/main' className='text-lg sm:text-xl hover:underline'>
                Main
              </Link>
            )}
            <button
              onClick={handleLogout}
              className='text-lg sm:text-xl hover:underline'
            >
              Logout
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

Header.propTypes = {
  showNavLinks: PropTypes.bool,
  onSearch: PropTypes.func,
};

export default Header;
