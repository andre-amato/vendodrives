import PropTypes from 'prop-types';

// Card component to display car information
const Card = ({ car }) => {
  return (
    <div className='max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white'>
      <img
        className='w-full'
        src={car.photo || 'https://via.placeholder.com/400'}
        alt={car.car || 'Car'}
      />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{car.car || 'Car Name'}</div>
        <p className='text-gray-700 text-base'>Price: {car.price || '€0.00'}</p>
        <p className='text-gray-700 text-base'>
          Zip Code: {car.zipCode || '00000'}
        </p>
      </div>
    </div>
  );
};

// Define the expected types of props
Card.propTypes = {
  car: PropTypes.shape({
    photo: PropTypes.string,
    car: PropTypes.string,
    price: PropTypes.string,
    zipCode: PropTypes.string,
  }).isRequired,
};

export default Card;
