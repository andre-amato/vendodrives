import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import racingFlagLogin from '../assets/racing-flag-login2.png'; // Import your image
import Header from '../components/Header';

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        navigate('/main');
      } else {
        alert('Login failed: User does not exist or password is incorrect');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        navigate('/main');
      } else {
        alert('Registration failed: ' + (await response.json()).message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='relative min-h-screen bg-gray-100'>
      <Header showNavLinks={false} style={{ height: '80px' }} />
      <div
        className='absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-500'
        style={{
          backgroundImage: `url(${racingFlagLogin})`,
          backgroundSize: '500px 500px',
          backgroundRepeat: 'repeat',
          filter: 'invert(30%) brightness(100%) contrast(50%)',
        }}
      ></div>
      <div className='relative z-10 flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:items-start lg:px-20 lg:py-12'>
        <div className='hidden lg:flex flex-col items-start space-y-6 bg-blue-600 text-white p-8 rounded-xl w-full lg:w-1/2'>
          <div className='bg-white text-blue-600 p-4 rounded-xl'>
            <h1 className='text-3xl font-medium'>
              Affordable Wheels, Real Deals
            </h1>
          </div>
          <h2 className='text-xl mt-4'>
            Connect to buy and sell cheap cars in hard economic times!
          </h2>
          <ul className='list-disc pl-5 mb-6 text-lg'>
            <li>Wide selection of affordable cars</li>
            <li>Safe and trusted community</li>
            <li>Easy and quick transactions</li>
          </ul>
          <p className='text-lg'>
            Join the VendoDrives community today and drive your dream car at a
            dream price!
          </p>
        </div>
        <div className='relative bg-white p-8 rounded-2xl shadow-md w-80 mt-8 lg:mt-0 lg:w-96 lg:ml-8'>
          <h2 className='text-2xl font-bold mb-6 text-center'>
            {isRegistering ? 'Register' : 'Login'}
          </h2>
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
              <div className='mb-4'>
                <label className='block text-gray-700'>Name</label>
                <input
                  type='text'
                  className='w-full p-2 border border-gray-300 rounded-lg mt-1'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className='mb-4'>
              <label className='block text-gray-700'>Email</label>
              <input
                type='email'
                className='w-full p-2 border border-gray-300 rounded-lg mt-1'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='mb-6'>
              <label className='block text-gray-700'>Password</label>
              <input
                type='password'
                className='w-full p-2 border border-gray-300 rounded-lg mt-1'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className='mt-4 text-blue-500 hover:underline'
          >
            {isRegistering
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
