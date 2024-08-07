/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { CarFormDetails } from "../utils/types";

interface CarFormProps {
  onSubmit: (carDetails: CarFormDetails) => Promise<void>;
}

const CarForm: React.FC<CarFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false); // Track submission status

  // Retrieve user ID from local storage
  // const user = localStorage.getItem("userId"); // This will be used in carService

  // Handle title input change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  // Handle price input change and ensure only numbers and dots are allowed
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value.replace(/[^\d.]/g, ""));
  };

  // Handle zip code input change and ensure only numbers are allowed
  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZipCode(value.replace(/[^0-9]/g, "").slice(0, 10));
  };

  // Handle photo file input change
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0)
      setPhoto(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Ensure that onSubmit is called with the correct data including user
      await onSubmit({ title, price, zipCode, photo });
      // Clear the form fields
      setTitle("");
      setPrice("");
      setZipCode("");
      setPhoto(null);
      // Set submission status to true
      setSubmitted(true);
    } catch (error) {
      console.error("Error creating car:", error);
      setSubmitted(false); // Optionally handle error state
    }
  };

  return (
    <div className="flex justify-center items-start bg-white py-4">
      <form
        className="bg-white p-8 rounded-2xl border-4 border-blue-500 border-opacity-50 w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl text-center font-bold text-gray-800 mb-4">
          Post your car!
        </h2>
        <div className="flex flex-col gap-4">
          {/* Title Input */}
          <div className="flex flex-row items-center">
            <label htmlFor="car" className="w-1/4 text-gray-700 mr-2">
              Car:
            </label>
            <input
              type="text"
              id="car"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
              data-cy="car-name"
            />
          </div>
          {/* Price Input */}
          <div className="flex flex-row items-center">
            <label htmlFor="price" className="w-1/4 text-gray-700 mr-2">
              Price:
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="€0.00"
              required
              data-cy="car-price"
            />
          </div>
          {/* Zip Code Input */}
          <div className="flex flex-row items-center">
            <label htmlFor="zip-code" className="w-1/4 text-gray-700 mr-2">
              Zip Code:
            </label>
            <input
              type="text"
              id="zip-code"
              value={zipCode}
              onChange={handleZipCodeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter Zip Code"
              maxLength={10}
              required
              data-cy="car-zipcode"
            />
          </div>
          {/* Photo Upload */}
          <div className="flex flex-row items-center">
            <label htmlFor="photo-upload" className="w-1/4 text-gray-700 mr-2">
              Photo:
            </label>
            <div className="relative w-full">
              <input
                type="file"
                onChange={handlePhotoChange}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                id="photo-upload"
                required
                data-cy="car-image"
              />
              <label
                htmlFor="photo-upload"
                className={`py-2 px-4 border-2 rounded-lg cursor-pointer flex items-center justify-center ${
                  photo
                    ? "border-blue-500 bg-white text-blue-500"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                {photo ? `Selected file: ${photo.name}` : "Choose Photo"}
              </label>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            data-cy="car-submit"
            aria-pressed={submitted}
          >
            Submit
          </button>
          {/* Submission Status */}
          {submitted && (
            <p className="mt-4 text-green-500 font-semibold text-center">
              Your car is now available at VendoDrives!
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CarForm;
