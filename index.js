import express from 'express';
import dotenv from 'dotenv';
import newsletter from './newsletter.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/newsletter', newsletter);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);