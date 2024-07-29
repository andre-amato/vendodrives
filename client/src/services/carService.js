const API_URL = 'http://localhost:5001/cars';

// Fetch all cars from the API
export const fetchCars = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error; // Re-throw the error for higher-level handling
  }
};

// Create a new car with provided details
export const createCar = async (carDetails) => {
  const formData = new FormData();
  formData.append('title', carDetails.title);
  formData.append('price', carDetails.price);
  formData.append('zipCode', carDetails.zipCode);
  if (carDetails.photo) {
    formData.append('photo', carDetails.photo);
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to create car');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating car:', error);
    throw error; // Re-throw the error for higher-level handling
  }
};
