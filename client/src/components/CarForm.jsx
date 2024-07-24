const CarForm = () => {
  return (
    <form className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold text-gray-800'>Car Details</h2>
      <div className='flex flex-row items-center'>
        <label className='w-1/4 text-gray-700 mr-2'>Car:</label>
        <input
          type='text'
          className='w-full px-2 py-1 border border-gray-300 rounded'
        />
      </div>
      <div className='flex flex-row items-center'>
        <label className='w-1/4 text-gray-700 mr-2'>Price:</label>
        <input
          type='number'
          className='w-full px-2 py-1 border border-gray-300 rounded'
        />
      </div>
      <div className='flex flex-row items-center'>
        <label className='w-1/4 text-gray-700 mr-2'>Zip Code:</label>
        <input
          type='text'
          className='w-full px-2 py-1 border border-gray-300 rounded'
          placeholder='Enter Zip Code'
        />
      </div>
      <div className='flex flex-row items-center'>
        <label className='w-1/4 text-gray-700 mr-2'>Photo:</label>
        <div className='w-full h-20 border border-dashed border-gray-400 rounded flex justify-center items-center'>
          {/* Placeholder for photo */}
          <p className='text-gray-400'>Upload Photo</p>
        </div>
      </div>
    </form>
  );
};

export default CarForm;
