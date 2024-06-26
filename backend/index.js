// Import modules
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
// import userRoutes from './routes/userRoutes.js';
// import tweetRoutes from './routes/tweetRoutes.js';
import authRoutes from './routes/authRoutes.js'


// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
// app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/tweets', tweetRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
