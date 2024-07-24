import CarForm from '../components/CarForm';
import Card from '../components/Card';
import Header from '../components/Header';

const Main = () => {
  return (
    <div>
      <Header />
      <main className='p-4'>
        <div className='text-gray-700 mb-4'>Welcome to VendoDrives!</div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          <div className='flex justify-center'>
            {' '}
            {/* Container for centering */}
            <CarForm />
          </div>
          <div className='flex justify-center'>
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
