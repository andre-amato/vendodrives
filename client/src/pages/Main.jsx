import { useState, useEffect } from 'react';
import CarForm from '../components/CarForm';
import Card from '../components/Card';
import Header from '../components/Header';
import { fetchCars, createCar } from '../services/carService';

const Main = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('title'); // Default sorting by title
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order ascending

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

  const sortCards = (cards) => {
    return cards.sort((a, b) => {
      const aValue = a[sortCriteria];
      const bValue = b[sortCriteria];

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  };

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery)
  );

  const sortedCards = sortCards(filteredCards);

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
          <div className='sm:w-2/3 w-full'>
            {/* Sorting Controls */}
            <div className='flex gap-4 mb-4 justify-end'>
              <select
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                className='p-2 border border-gray-300 rounded'
              >
                <option value='title'>Name</option>
                <option value='price'>Price</option>
                <option value='zipCode'>Zip Code</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className='p-2 border border-gray-300 rounded'
              >
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
              </select>
            </div>
            {/* Cards */}
            <div className='card-container flex flex-col sm:flex-row flex-wrap justify-end ml-auto w-full'>
              {sortedCards.map((card, index) => (
                <Card key={index} carDetails={card} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
