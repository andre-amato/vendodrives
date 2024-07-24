import Button from './components/Button';
import Header from './components/Header';
import Card from './components/Card';

const App = () => {
  return (
    <div>
      <Header />
      <main className='p-4'>
        <p className='text-gray-700'>This is your VendoDrives app!</p>
        <Card />
        <Button />
      </main>
    </div>
  );
};

export default App;
