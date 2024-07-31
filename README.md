# VENDODRIVES

Vendodrives is a web application for managing and viewing messages related to vehicle listings. Users can view received messages, send new messages, post cars, and see cars by their geolocalization and other criteria. The project is built using React and Tailwind CSS in a MERN structure (MongoDB, Express, Node.js, and React).

## Features

- Post new cars
- View cars
- Filter cars by localization, price, and other criteria
- View received messages
- Send new messages
- Manage your posted cars (view, edit, and delete)
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
   
   - Running the client:
     
   cd client
   
   npm i
   
   npm run dev

   - Running the server:
     
   cd server
   
   npm i

   *create an .env file following the example.env file()*
   
   node server.js
     

4. Start the development server:
   npm start

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

My Cars
React Page for managing the cars posted by the user, including:

View: See all cars posted by the user.
Edit: Modify details of a posted car.
Delete: Remove a car listing.

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

Managing Your Cars
Navigate to the "My Cars" section.
View a list of all cars you have posted.
Use the edit option to modify car details.
Use the delete option to remove a car listing. Note that this action is permanent and cannot be undone.

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


**Acknowledgements**

- React
- Tailwind CSS
- Express
- Cloudinary
- Leaflet
- OpenStreetMap
- Node.js
- JWT

**Photos**
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/134c3ea9-12c3-419f-9708-7ef1922f3d5b">
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/efe2553b-3f06-4197-ba72-06fdb0bbfa10">
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/dd2a4d4d-7ded-4a77-80a9-e0f884fe67f2">
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/80fb2fc6-201a-4242-a547-ea991fc92e5f">



**SM View**

<img width="357" alt="image" src="https://github.com/user-attachments/assets/5237b73e-89d5-4f52-b0ff-7227a9f2f4a3">
<img width="345" alt="image" src="https://github.com/user-attachments/assets/009e1efd-365a-4c1f-8a4d-3d3c6fa0216d">
<img width="356" alt="image" src="https://github.com/user-attachments/assets/3bffbdb5-fe1f-4ae7-8ed0-1d50cc946c94">
<img width="346" alt="image" src="https://github.com/user-attachments/assets/c8be10be-f4c4-4b50-8cbc-940470959e3c">


