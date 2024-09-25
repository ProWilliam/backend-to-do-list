import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth/auth';
import todoRoutes from './routes/todo/todo';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors())

app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;