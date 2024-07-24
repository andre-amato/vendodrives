import Header from '../components/Header';

const Messages = () => {
  return (
    <div>
      <Header />
      <main className='p-4'>
        <h2 className='text-2xl text-gray-700'>Your Messages</h2>
        <p className='text-gray-700'>
          This is where your messages will appear.
        </p>
      </main>
    </div>
  );
};

export default Messages;
