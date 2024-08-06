import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

interface Car {
  _id: string;
  title: string;
  price: number;
  zipCode: string;
  photo?: string;
}

const UserCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Retrieve userId from local storage or any other state management
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/users/${userId}/cars`,
        );
        setCars(response.data);
      } catch (err) {
        setError("Error fetching user cars");
        console.error(err);
      }
    };

    if (userId) {
      fetchUserCars();
    } else {
      setError("User not logged in");
    }
  }, [userId]);

  const handleDelete = async (carId: string) => {
    try {
      await axios.delete(`http://localhost:5001/cars/${carId}`);
      setCars(cars.filter((car) => car._id !== carId));
    } catch (err) {
      setError("Error deleting car");
      console.error(err);
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div>
      <Header /> {/* Header component at the top */}
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Cars</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.length === 0 ? (
            <p>No cars found.</p>
          ) : (
            cars.map((car) => (
              <div key={car._id} className="border p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{car.title}</h2>
                <p>Price: €{car.price}</p>
                <p>Zip Code: {car.zipCode}</p>
                {car.photo && (
                  <img
                    src={car.photo}
                    alt={car.title}
                    className="w-full h-auto mt-2"
                  />
                )}
                <div className="flex justify-center mt-4 space-x-4">
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-full"
                  >
                    Delete
                  </button>
                  <button className="bg-green-500 text-white py-2 px-4 rounded-full">
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default UserCars;
