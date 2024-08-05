import { CarDetails, CarFormDetails } from "../utils/types";

const API_URL = "http://localhost:5001/cars";

// Fetch all cars from the API
export const fetchCars = async (): Promise<CarDetails[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error; // Re-throw the error for higher-level handling
  }
};

// Create a new car with provided details
export const createCar = async (
  carDetails: CarFormDetails,
): Promise<CarDetails> => {
  const formData = new FormData();
  formData.append("title", carDetails.title);
  formData.append("price", carDetails.price.toString());
  formData.append("zipCode", carDetails.zipCode);
  const user = localStorage.getItem("userId"); // Retrieve user ID
  if (!user) {
    throw new Error("User not logged in");
  }
  formData.append("user", user); // Update field name to 'user'
  if (carDetails.photo) {
    formData.append("photo", carDetails.photo);
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorText = await response.text(); // Get error message from response
      throw new Error(
        `Failed to create car: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating car:", error);
    throw error; // Re-throw the error for higher-level handling
  }
};
