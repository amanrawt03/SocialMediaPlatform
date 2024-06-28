
import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js'



dotenv.config();

const app = express();
const port = 3000;


connectDB();


app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({extended:true}))


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});
