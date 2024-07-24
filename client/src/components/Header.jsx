import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // For the fake logout, we'll just navigate to the login page
    navigate('/');
  };

  return (
    <header className='bg-blue-500 text-white p-4 flex justify-between items-center'>
      <h1 className='text-2xl'>Welcome to VendoDrives</h1>
      <div>
        {location.pathname === '/messages' ? (
          <Link to='/main' className='mr-4 hover:underline'>
            Main
          </Link>
        ) : (
          <Link to='/messages' className='mr-4 hover:underline'>
            Messages
          </Link>
        )}
        <button onClick={handleLogout} className='hover:underline'>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
