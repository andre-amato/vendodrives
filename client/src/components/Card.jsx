import PropTypes from 'prop-types';

const Card = ({ carDetails }) => {
  const { title, price, zipCode, photo } = carDetails;

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white'>
      <img
        className='object-cover'
        style={{ width: '400px', height: '400px' }}
        src={photo || 'https://via.placeholder.com/400'}
        alt={title || 'Sample Image'}
      />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{title || 'Card Title'}</div>
        <p className='text-gray-700 text-base'>
          Price: {price ? `€${price}` : 'N/A'}
        </p>
        <p className='text-gray-700 text-base'>Zip Code: {zipCode || 'N/A'}</p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          #example
        </span>
        <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
          #tailwindcss
        </span>
      </div>
    </div>
  );
};

Card.propTypes = {
  carDetails: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Allows both string and number
    zipCode: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};

export default Card;
