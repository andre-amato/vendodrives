import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const loadCar = async () => {
      try {
        const response = await fetch(`http://localhost:5001/cars/${id}`);
        const carData = await response.json();
        setCar(carData);
      } catch (error) {
        console.error('Error loading car:', error);
      }
    };

    loadCar();
  }, [id]);

  useEffect(() => {
    if (car && car.zipCode) {
      const map = L.map('map').setView([0, 0], 13); // Default center

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Use Nominatim to convert zip code to coordinates
      fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${car.zipCode}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          const { lat, lon } = data[0];
          map.setView([lat, lon], 13);
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`Car Location: ${car.zipCode}`);
        });
    }
  }, [car]);

  if (!car) return <div>Loading...</div>;

  return (
    <div className='car-details-container'>
      <h1 className='text-2xl font-bold'>{car.title}</h1>
      <img
        src={
          car.photo
            ? URL.createObjectURL(car.photo)
            : 'https://via.placeholder.com/400'
        }
        alt={car.title}
        className='w-64 h-64'
      />
      <p>Price: {car.price ? `€${car.price}` : 'N/A'}</p>
      <p>Zip Code: {car.zipCode || 'N/A'}</p>
      <div id='map' style={{ height: '400px', width: '100%' }}></div>{' '}
      {/* Map container */}
    </div>
  );
};

export default CarDetails;
