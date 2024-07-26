import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // Adjust the import path as necessary

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For this fake login, we'll just navigate to the main page
    navigate('/main');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Header showNavLinks={false} /> {/* Header without nav links */}
      <div className='bg-white p-8 rounded-2xl shadow-md w-80 mt-8'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Email</label>
            <input
              className='w-full p-2 border border-gray-300 rounded-lg mt-1'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              className='w-full p-2 border border-gray-300 rounded-lg mt-1'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
