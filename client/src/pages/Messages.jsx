import { useState } from 'react';
import Header from '../components/Header';

const messages = [
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
  const [messageList, setMessageList] = useState(messages);

  return (
    <div className='messages-container bg-gray-50 min-h-screen'>
      <Header />
      <main className='p-6'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6'>Your Messages</h2>
        {messageList.length > 0 ? (
          <ul className='message-list space-y-6'>
            {messageList.map((message) => (
              <li
                key={message.id}
                className='message-item bg-white p-4 rounded-lg shadow'
              >
                <div className='message-header flex justify-between items-center mb-2'>
                  <div className='sender-info'>
                    <p className='font-bold text-lg text-gray-900'>
                      {message.name}
                    </p>
                    <p className='text-gray-500 text-sm'>{message.contact}</p>
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
          <p className='text-gray-700'>No messages found.</p>
        )}
      </main>
    </div>
  );
};

export default Messages;
