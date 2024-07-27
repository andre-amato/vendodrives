import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(''); // State for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // To toggle between login and registration

  // Handle user login
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
        navigate('/main');
      } else {
        alert('Login failed: User does not exist or password is incorrect');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Include name in the request body
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/main');
      } else {
        alert('Registration failed: ' + (await response.json()).message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Header showNavLinks={false} /> {/* Header without nav links */}
      <div className='bg-white p-8 rounded-2xl shadow-md w-80 mt-8'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && ( // Show name field only for registration
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
  );
};

export default Login;
