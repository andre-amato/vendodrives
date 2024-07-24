const Card = () => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white'>
      <img
        className='w-full'
        src='https://via.placeholder.com/400'
        alt='Sample Image'
      />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>Card Title</div>
        <p className='text-gray-700 text-base'>
          This is a sample card description. You can add any content here.
        </p>
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

export default Card;
