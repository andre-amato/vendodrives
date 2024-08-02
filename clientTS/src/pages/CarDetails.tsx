import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from '../components/Header'; // Adjust the import path as needed
import { getCoordinatesFromZipCode } from '../utils/geocode'; // Import the geocode function
import PropTypes from 'prop-types';

const SetMapView = ({ coordinates }) => {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lng], 13);
    }
  }, [coordinates, map]);

  return null;
};

SetMapView.propTypes = {
  coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
};

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [coordinates, setCoordinates] = useState(null); // Start with null

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/cars/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setCar(response.data);

        // Fetch coordinates based on the zip code
        const { lat, lng } = await getCoordinatesFromZipCode(
          response.data.zipCode
        );
        setCoordinates({ lat, lng });
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
        <div className='flex flex-col md:flex-row w-full max-w-6xl'>
          {/* Car Details Section */}
          <div className='md:w-1/3 p-4 flex flex-col items-center md:items-start'>
            <h1 className='text-3xl font-bold text-center mb-4'>{car.title}</h1>
            <p className='text-lg mt-4'>Price: €{car.price}</p>
            <p className='text-lg'>Zip Code: {car.zipCode}</p>
            <img
              src={car.photo}
              alt={car.title}
              className='w-full h-auto object-cover rounded-lg shadow-md mt-8' // Added margin-top to push the image down
            />
          </div>
          {/* Map Section */}
          <div className='md:w-2/3 p-4 flex-grow relative z-map'>
            <MapContainer
              center={
                coordinates
                  ? [coordinates.lat, coordinates.lng]
                  : [51.505, -0.09]
              } // Default to London
              zoom={13}
              style={{ height: '400px', width: '100%' }}
              className='relative z-map' // Apply relative position and custom z-index
              whenCreated={(map) =>
                map.setView([coordinates.lat, coordinates.lng], 13)
              }
            >
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <SetMapView coordinates={coordinates} />
              {coordinates && (
                <Marker position={[coordinates.lat, coordinates.lng]}>
                  <Popup>{car.title}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetails;
