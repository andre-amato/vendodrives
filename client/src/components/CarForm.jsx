import { useState } from 'react';
import PropTypes from 'prop-types';

const CarForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Remove non-numeric characters except '.'
    const formattedValue = value.replace(/[^\d.]/g, '');
    setPrice(formattedValue);
  };

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    // ZIP CODE FORMAT -> Allow only numbers and limit the length
    const formattedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    setZipCode(formattedValue);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onSubmit({ title, price, zipCode, photo });
    // Clear the form fields
    setTitle('');
    setPrice('');
    setZipCode('');
    setPhoto(null);
  };

  return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <h2 className='text-xl font-bold text-gray-800'>Car Details</h2>
      <div className='flex flex-row items-center'>
        <label className='w-1/4 text-gray-700 mr-2'>Car:</label>
        <input
          type='text'
          value={title}
          onChange={handleTitleChange}
          className='w-full px-2 py-1 border border-gray-300 rounded'
        />
      </div>
      <div className='flex flex-row items-center'>
        <label className='w-1/4 text-gray-700 mr-2'>Price:</label>
        <input
          type='text'
          value={price}
          onChange={handlePriceChange}
          className='w-full px-2 py-1 border border-gray-300 rounded'
          placeholder='€0.00'
        />
      </div>
      <div className='flex flex-row items-center'>
        <label className='w-1/4 text-gray-700 mr-2'>Zip Code:</label>
        <input
          type='text'
          value={zipCode}
          onChange={handleZipCodeChange}
          className='w-full px-2 py-1 border border-gray-300 rounded'
          placeholder='Enter Zip Code'
          maxLength='10'
        />
      </div>
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
            className='py-2 px-4 border border-gray-300 rounded bg-white text-gray-700 cursor-pointer flex items-center justify-center'
          >
            {photo ? `Selected file: ${photo.name}` : 'Choose Photo'}
          </label>
        </div>
      </div>
      <button
        type='submit'
        className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Submit
      </button>
    </form>
  );
};

CarForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CarForm;
