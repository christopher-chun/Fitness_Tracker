import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import workoutRoutes from './routes/workoutRoutes.js';
import noteRoutes from './routes/noteRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectDB();

app.use('/api/workouts', workoutRoutes);
app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
  res.send('Fitness Tracker API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
