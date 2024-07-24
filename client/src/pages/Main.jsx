import { useState } from 'react';
import CarForm from '../components/CarForm';
import Card from '../components/Card';
import Header from '../components/Header';

const Main = () => {
  // State to store car information
  const [carData, setCarData] = useState(null);

  // Function to handle form submission and set car data
  const handleFormSubmit = (data) => {
    setCarData(data);
  };

  return (
    <div className='main-container'>
      <Header className='sticky top-0 bg-white shadow-md z-30' />{' '}
      {/* Sticky Header */}
      <main className='p-4'>
        <div className='flex flex-col sm:flex-row'>
          <div className='form-container sm:sticky top-4 w-full sm:w-1/3 h-fit p-4 overflow-y-auto bg-white shadow-md z-20'>
            {/* Sticky form with full width on mobile and 30% width on larger screens */}
            <CarForm onSubmit={handleFormSubmit} />
          </div>
          <div className='card-container flex flex-col sm:flex-row flex-wrap justify-end ml-auto w-full sm:w-2/3'>
            {carData ? (
              <Card car={carData} />
            ) : (
              // Render placeholder cards if no data is available
              <>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
