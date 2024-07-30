# Vendodrives

Vendodrives is a web application for managing and viewing messages related to vehicle listings. Users can view received messages, send new messages, post cars, and see cars by their geolocalization and other criteria. The project is built using React and Tailwind CSS in a MERN structure (MongoDB, Express, Node.js, and React).

## Features

- Post new cars
- View cars
- Filter cars by localization, price, and other criteria
- View received messages
- Send new messages
- Responsive design with optimized layout for mobile and desktop

## Technologies Used

- React
- Tailwind CSS
- Express
- Cloudinary
- Leaflet
- OpenStreetMap
- Node.js
- JWT (JSON Web Token)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/andre-amato/vendodrive.git
   cd vendodrives
   
2. Install the dependencies:
   npm install

3. Start the development server:
   npm start

**Project Structure**
   vendodrives/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── index.jsx
│   └── ...
├── server/
│   ├── models/
│   │   └── ...
│   ├── routes/
│   │   └── ...
│   ├── controllers/
│   │   └── ...
│   └── ...
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── README.md
└── ...
**Components**
Header
Displays the header section of the application.

Messages
Main component that displays the messages interface, including:

Received Messages: Lists messages received from other users.
Sent Messages: Lists messages sent by the user.
Form: Allows the user to send a new message.

Cars
Components for viewing, posting, and filtering cars based on various criteria such as location and price.

Car Form
Title: Enter the title of the car listing.
Price: Enter the price of the car.
Zip Code: Enter the zip code where the car is located.
Photo Upload: Upload a photo of the car using Cloudinary.

**Usage**
Viewing Messages
Received messages are displayed on the right side (or below on mobile) with a purple border.
Sent messages are displayed on the left side (or above on mobile) with a blue border.

Sending a Message
Enter the message content.
Click the "Submit" button to send the message. The message will appear in the "Sent Messages" section.

Deleting a Message
Click the red delete button (x) on a message to remove it from the list. Note that this is for visual purposes only and will not persist on page refresh.

Posting a Car
Navigate to the "Car Form" section.
Fill in the details of the car, including title, price, zip code, and upload an image using Cloudinary.
Submit the form to post the car listing.

**Viewing and Filtering Cars**
View all posted cars on the main page.
Use the filter options to narrow down cars based on location (using Leaflet and OpenStreetMap), price, and other criteria.

**Responsive Design**
On larger screens, messages are displayed in a flexbox layout with sent messages on the left and received messages on the right.
On smaller screens, the layout adjusts to display sent messages above received messages for better readability.

**Contributing**
Fork the repository.
Create a new branch: git checkout -b feature/your-feature-name.
Make your changes and commit them: git commit -m 'Add some feature'.
Push to the branch: git push origin feature/your-feature-name.
Open a pull request to the main branch.


**Acknowledgements
React
Tailwind CSS
Express
Cloudinary
Leaflet
OpenStreetMap
Node.js
JWT**
