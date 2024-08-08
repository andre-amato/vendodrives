import axios from "axios";

interface Coordinates {
  lat: number;
  lng: number;
}

export const getCoordinatesFromZipCode = async (
  zipCode: string,
): Promise<Coordinates> => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: zipCode,
          format: "json",
          addressdetails: 1,
          limit: 1,
        },
      },
    );

    const { data } = response;
    if (data.length > 0) {
      const { lat, lon } = data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return { lat: 51.505, lng: -0.09 }; // Default to London if error occurs
  }
};
