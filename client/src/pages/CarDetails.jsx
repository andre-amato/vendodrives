import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../components/Header'; // Adjust the import path as needed

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/cars/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) return <p>Loading...</p>;

  return (
    <div className='car-details'>
      <Header /> {/* Header component at the top */}
      <main className='p-4 flex flex-col items-center'>
        <h1 className='text-3xl font-bold text-center mb-4'>{car.title}</h1>
        <div className='flex flex-col md:flex-row w-full max-w-6xl'>
          {/* Car Details Section */}
          <div className='md:w-1/3 p-4 flex flex-col items-center md:items-start'>
            <img
              src={car.photo}
              alt={car.title}
              className='w-full h-auto object-cover rounded-lg shadow-md'
            />
            <p className='text-lg mt-4'>Price: €{car.price}</p>
            <p className='text-lg'>Zip Code: {car.zipCode}</p>
          </div>
          {/* Map Section */}
          <div className='md:w-2/3 p-4 flex-grow'>
            <MapContainer
              center={[51.505, -0.09]} // Placeholder coordinates
              zoom={13}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[51.505, -0.09]}>
                <Popup>{car.title}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetails;
