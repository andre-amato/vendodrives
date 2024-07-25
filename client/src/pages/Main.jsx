import { useState } from 'react';
import CarForm from '../components/CarForm';
import Card from '../components/Card';
import Header from '../components/Header';

const Main = () => {
  const [cards, setCards] = useState([]);

  const handleFormSubmit = (carDetails) => {
    setCards([...cards, carDetails]);
  };

  return (
    <div className='main-container'>
      <Header className='sticky top-0 bg-white shadow-md z-30' />
      <main className='p-4'>
        <div className='flex flex-col sm:flex-row'>
          <div className='form-container sm:sticky top-4 w-full sm:w-1/3 h-fit p-4 overflow-y-auto bg-white shadow-md z-20'>
            <CarForm onSubmit={handleFormSubmit} />
          </div>
          <div className='card-container flex flex-col sm:flex-row flex-wrap justify-end ml-auto w-full sm:w-2/3'>
            {cards.map((card, index) => (
              <Card key={index} carDetails={card} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
