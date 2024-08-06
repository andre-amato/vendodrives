import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import Header from "../components/Header"; // Adjust the import path as needed
import { getCoordinatesFromZipCode } from "../utils/geocode"; // Import the geocode function

interface Coordinates {
  lat: number;
  lng: number;
}

interface CarDetails {
  title: string;
  price: number;
  zipCode: string;
  photo: string;
}

const SetMapView: React.FC<{ coordinates: Coordinates | null }> = ({
  coordinates,
}) => {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates.lat, coordinates.lng], 13);
    }
  }, [coordinates, map]);

  return null;
};

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarDetails | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/cars/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCar(response.data);

        // Fetch coordinates based on the zip code
        const { lat, lng } = await getCoordinatesFromZipCode(
          response.data.zipCode,
        );
        setCoordinates({ lat, lng });
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car || !coordinates) return <p>Loading...</p>;

  const position: LatLngExpression = [coordinates.lat, coordinates.lng];

  return (
    <div className="car-details">
      <Header />
      <main className="p-4 flex flex-col items-center">
        <div className="flex flex-col md:flex-row w-full max-w-6xl">
          <div className="md:w-1/3 p-4 flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-bold text-center mb-4">{car.title}</h1>
            <p className="text-lg mt-4">Price: €{car.price}</p>
            <p className="text-lg">Zip Code: {car.zipCode}</p>
            <img
              src={car.photo}
              alt={car.title}
              className="w-full h-auto object-cover rounded-lg shadow-md mt-8"
            />
          </div>
          <div className="md:w-2/3 p-4 flex-grow relative z-map">
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "400px", width: "100%" }}
              className="relative z-map"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <SetMapView coordinates={coordinates} />
              <Marker position={position}>
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
