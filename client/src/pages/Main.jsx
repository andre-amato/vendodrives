import { useState, useEffect } from 'react';
import CarForm from '../components/CarForm';
import Card from '../components/Card';
import Header from '../components/Header';

const Main = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch car data from the server
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5001/cars');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCars();
  }, []);

  const handleFormSubmit = (carDetails) => {
    setCards([...cards, carDetails]);
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
