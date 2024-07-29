import { useState } from 'react';
import PropTypes from 'prop-types';

// Component to handle car creation form
const CarForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [photo, setPhoto] = useState(null);

  // Handle title input change
  const handleTitleChange = (e) => setTitle(e.target.value);

  // Handle price input change and ensure only numbers and dots are allowed
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value.replace(/[^\d.]/g, ''));
  };

  // Handle zip code input change and ensure only numbers are allowed
  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    setZipCode(value.replace(/[^0-9]/g, '').slice(0, 10));
  };

  // Handle photo file input change
  const handlePhotoChange = (e) => {
    if (e.target.files.length > 0) setPhoto(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure that onSubmit is called with the correct data
    onSubmit({ title, price, zipCode, photo });
    // Clear the form fields
    setTitle('');
    setPrice('');
    setZipCode('');
    setPhoto(null);
  };

  return (
    <div className='flex justify-center items-start bg-white py-4'>
      <form
        className='bg-white p-8 rounded-2xl border-4 border-blue-500 border-opacity-50 w-96'
        onSubmit={handleSubmit}
      >
        <h2 className='text-xl text-center font-bold text-gray-800 mb-4'>
          Post your car!
        </h2>
        <div className='flex flex-col gap-4'>
          {/* Title Input */}
          <div className='flex flex-row items-center'>
            <label className='w-1/4 text-gray-700 mr-2'>Car:</label>
            <input
              type='text'
              value={title}
              onChange={handleTitleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg'
              required
            />
          </div>
          {/* Price Input */}
          <div className='flex flex-row items-center'>
            <label className='w-1/4 text-gray-700 mr-2'>Price:</label>
            <input
              type='text'
              value={price}
              onChange={handlePriceChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg'
              placeholder='€0.00'
              required
            />
          </div>
          {/* Zip Code Input */}
          <div className='flex flex-row items-center'>
            <label className='w-1/4 text-gray-700 mr-2'>Zip Code:</label>
            <input
              type='text'
              value={zipCode}
              onChange={handleZipCodeChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg'
              placeholder='Enter Zip Code'
              maxLength='10'
              required
            />
          </div>
          {/* Photo Upload */}
          <div className='flex flex-row items-center'>
            <label className='w-1/4 text-gray-700 mr-2'>Photo:</label>
            <div className='relative w-full'>
              <input
                type='file'
                onChange={handlePhotoChange}
                className='absolute opacity-0 w-full h-full cursor-pointer'
                id='photo-upload'
              />
              <label
                htmlFor='photo-upload'
                className={`py-2 px-4 border-2 rounded-lg cursor-pointer flex items-center justify-center ${
                  photo
                    ? 'border-blue-500 bg-white text-blue-500'
                    : 'border-gray-300 bg-white text-gray-700'
                }`}
              >
                {photo ? `Selected file: ${photo.name}` : 'Choose Photo'}
              </label>
            </div>
          </div>
          {/* Submit Button */}
          <button
            type='submit'
            className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

CarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CarForm;
