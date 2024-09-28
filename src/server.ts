import express, { Application } from 'express';
import logger  from 'morgan';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/auth/auth';
import todoRoutes from './routes/todo/todo';
import dotenv from 'dotenv';
import { createWebSocket } from './websocket/websocket';
import { createServer } from 'http';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors())
app.use(express.json());
app.use(logger('dev'));

// Connect database
connectDB();

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Initialize WebSocket with HTTP server\
const server = createServer(app);
createWebSocket(server);

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;