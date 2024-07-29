import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // Adjust the import path as needed

const UserCars = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  // Retrieve userId from local storage or any other state management
  const userId = localStorage.getItem('userId'); // Ensure this is set during login

  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/users/${userId}/cars`
        );
        setCars(response.data);
      } catch (err) {
        setError('Error fetching user cars');
        console.error(err);
      }
    };

    if (userId) {
      fetchUserCars();
    } else {
      setError('User not logged in');
    }
  }, [userId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header /> {/* Header component at the top */}
      <main className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>My Cars</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {cars.length === 0 ? (
            <p>No cars found.</p>
          ) : (
            cars.map((car) => (
              <div key={car._id} className='border p-4 rounded-lg shadow-md'>
                <h2 className='text-xl font-semibold'>{car.title}</h2>
                <p>Price: €{car.price}</p>
                <p>Zip Code: {car.zipCode}</p>
                {car.photo && (
                  <img
                    src={car.photo}
                    alt={car.title}
                    className='w-full h-auto mt-2'
                  />
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default UserCars;
