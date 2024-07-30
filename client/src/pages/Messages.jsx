import { useState } from 'react';
import Header from '../components/Header';

const initialMessages = [
  {
    id: 1,
    name: 'John Doe',
    contact: '+1234567890',
    time: '2024-07-24 10:00:00',
    content:
      "Hi, I'm interested in buying your Volkswagen Gol you listed. Can you tell me more about it?",
  },
  {
    id: 2,
    name: 'Jane Smith',
    contact: 'jane.smith@example.com',
    time: '2024-07-23 15:30:00',
    content: 'Is this Fusca still available for sale?',
  },
  {
    id: 3,
    name: 'Sarah Lee',
    contact: 'sarah.lee@company.com',
    time: '2024-07-25 12:00:00',
    content:
      "I'm selling a slightly used Fusca in excellent condition. Are you interested?",
  },
  {
    id: 4,
    name: 'David Kim',
    contact: 'david.kim@gmail.com',
    time: '2024-07-24 17:30:00',
    content: 'Could you send me some pictures of your Fusca?',
  },
  {
    id: 5,
    name: 'System Notification',
    contact: 'noreply@service.com',
    time: '2024-07-24 08:00:00',
    content: 'Reminder: Your listing for Fusca expires in 3 days.',
  },
  {
    id: 6,
    name: 'Alex Rodriguez',
    contact: '+521234567890',
    time: '2024-07-23 11:00:00',
    content: 'Hola! ¿Cómo estás? Tengo una pregunta sobre mi suscripción.',
  },
  {
    id: 7,
    name: 'Jessica Williams',
    contact: 'jessica.williams@yahoo.com',
    time: '2024-07-22 20:15:00',
    content: 'Thanks for your purchase! We hope you enjoy your new product.',
  },
];

const Messages = () => {
  const [messageList] = useState(initialMessages);
  const [sentMessages, setSentMessages] = useState([]);
  const [user, setUser] = useState('');
  const [messageContent, setMessageContent] = useState('');

  const getUserContact = (username) => {
    switch (username) {
      case 'Jonas':
        return '+9876543210';
      case 'Erico':
        return 'erico.contact@example.com';
      default:
        return 'N/A';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      id: sentMessages.length + 1,
      name: user,
      contact: getUserContact(user),
      time: new Date().toISOString(),
      content: messageContent,
    };
    setSentMessages([newMessage, ...sentMessages]);
    setUser('');
    setMessageContent('');
  };

  const handleDeleteMessage = (id, type) => {
    if (type === 'sent') {
      setSentMessages(sentMessages.filter((message) => message.id !== id));
    } else {
      // For received messages, assuming this would be similar logic
      // You might want to handle this differently based on your requirements
    }
  };

  return (
    <div className='messages-container bg-gray-50 min-h-screen'>
      <Header />
      <main className='p-6'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6'>Your Messages</h2>

        {/* Form for writing messages */}
        <div className='mb-6'>
          <form
            className='bg-white p-6 rounded-lg shadow-md'
            onSubmit={handleSubmit}
          >
            <div className='mb-4'>
              <label htmlFor='user' className='block text-gray-700 mb-2'>
                User:
              </label>
              <select
                id='user'
                className='w-full p-2 border border-gray-300 rounded-lg'
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              >
                <option value=''>Select User</option>
                <option value='Jonas'>Jonas</option>
                <option value='Erico'>Erico</option>
              </select>
            </div>
            <div className='mb-4'>
              <label htmlFor='message' className='block text-gray-700 mb-2'>
                Message:
              </label>
              <input
                type='text'
                id='message'
                className='w-full p-2 border border-gray-300 rounded-lg'
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                required
              />
            </div>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
            >
              Submit
            </button>
          </form>
        </div>

        <div className='flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6'>
          {/* Sent Messages Section */}
          <div className='flex-1 lg:order-1'>
            <h3 className='text-2xl font-bold text-gray-800 mb-4'>
              Sent Messages ({sentMessages.length})
            </h3>
            <div className='border-l-4 border-blue-500 p-4'>
              {sentMessages.length > 0 ? (
                <ul className='message-list space-y-6'>
                  {sentMessages.map((message) => (
                    <li
                      key={message.id}
                      className='message-item bg-white p-4 rounded-lg shadow relative'
                    >
                      <button
                        onClick={() => handleDeleteMessage(message.id, 'sent')}
                        className='absolute top-2 right-2 text-red-500 hover:text-red-700'
                      >
                        &times;
                      </button>
                      <div className='message-header flex justify-between items-center mb-2'>
                        <div className='sender-info'>
                          <p className='font-bold text-lg text-gray-900'>
                            {message.name}
                          </p>
                          <p className='text-gray-500 text-sm'>
                            {message.contact}
                          </p>
                        </div>
                        <p className='text-gray-400 text-sm'>{message.time}</p>
                      </div>
                      <p className='message-content text-gray-700'>
                        {message.content}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-gray-700'>No sent messages found.</p>
              )}
            </div>
          </div>

          {/* Received Messages Section */}
          <div className='flex-1 lg:order-2'>
            <h3 className='text-2xl font-bold text-gray-800 mb-4'>
              Received Messages ({messageList.length})
            </h3>
            <div className='border-l-4 border-purple-500 p-4'>
              {messageList.length > 0 ? (
                <ul className='message-list space-y-6'>
                  {messageList.map((message) => (
                    <li
                      key={message.id}
                      className='message-item bg-white p-4 rounded-lg shadow relative'
                    >
                      <button
                        onClick={() =>
                          handleDeleteMessage(message.id, 'received')
                        }
                        className='absolute top-2 right-2 text-red-500 hover:text-red-700'
                      >
                        &times;
                      </button>
                      <div className='message-header flex justify-between items-center mb-2'>
                        <div className='sender-info'>
                          <p className='font-bold text-lg text-gray-900'>
                            {message.name}
                          </p>
                          <p className='text-gray-500 text-sm'>
                            {message.contact}
                          </p>
                        </div>
                        <p className='text-gray-400 text-sm'>{message.time}</p>
                      </div>
                      <p className='message-content text-gray-700'>
                        {message.content}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-gray-700'>No received messages found.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
