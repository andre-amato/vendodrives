import { useState, useEffect } from 'react';
import CarForm from '../components/CarForm';
import Card from '../components/Card';
import Header from '../components/Header';
import { fetchCars, createCar } from '../services/carService';

const Main = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadCars = async () => {
      try {
        const cars = await fetchCars();
        setCards(cars);
      } catch (error) {
        console.error('Error loading cars:', error);
      }
    };

    loadCars();
  }, []);

  const handleFormSubmit = async (carDetails) => {
    try {
      const newCar = await createCar(carDetails);
      setCards([...cards, newCar]);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div className='main-container'>
      <Header
        onSearch={handleSearch}
        className='sticky top-0 bg-white shadow-md z-30'
      />
      <main className='p-4'>
        <div className='flex flex-col sm:flex-row'>
          <div className='form-container sm:sticky top-4 w-full sm:w-1/3 h-fit p-4 overflow-y-auto bg-white shadow-md z-20'>
            <CarForm onSubmit={handleFormSubmit} />
          </div>
          <div className='card-container flex flex-col sm:flex-row flex-wrap justify-end ml-auto w-full sm:w-2/3'>
            {filteredCards.map((card, index) => (
              <Card key={index} carDetails={card} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
