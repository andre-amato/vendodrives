import express, { Application } from 'express';
import mongoose from 'mongoose';
import carRoutes from './routes/carRoutes';
import userRoutes from './routes/userRoutes';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: Error) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/cars', carRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});