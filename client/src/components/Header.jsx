import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import racingFlag from '../assets/racing-flag.png';
import HamburgerButton from './HamburguerButton';

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
            <HamburgerButton onClick={toggleMenu} />
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
                  className='mt-2 sm:mt-0 px-4 py-2 border border-gray-300 rounded-full w-full sm:w-auto text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onChange={handleSearchChange}
                />
                <Link
                  to='/messages'
                  className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                >
                  Messages
                </Link>
                {/* Add the new button here */}
                <Link
                  to='/user-cars'
                  className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                >
                  My Cars
                </Link>
              </>
            ) : (
              <Link
                to='/main'
                className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              >
                Main
              </Link>
            )}
            <button
              onClick={handleLogout}
              className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
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
