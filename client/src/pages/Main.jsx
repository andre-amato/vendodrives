import CarForm from '../components/CarForm';
import Card from '../components/Card';
import Header from '../components/Header';

const Main = () => {
  return (
    <div className='main-container'>
      <Header className='sticky top-0 bg-white shadow-md z-30' />{' '}
      {/* Sticky Header */}
      <main className='p-4'>
        <div className='flex'>
          <div className='form-container sticky top-4 w-1/3 h-fit p-4 overflow-y-auto bg-white shadow-md z-20'>
            {/* Sticky form with 30% width */}
            <CarForm />
          </div>
          <div className='card-container flex flex-wrap justify-end ml-auto w-2/3 h-screen overflow-y-auto'>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            {/* Add more Card components as needed */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
