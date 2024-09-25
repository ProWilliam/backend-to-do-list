import mongoose from 'mongoose';
import connectDB from './db';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('mongoose'); 

describe('connectDB', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to MongoDB', async () => {
    (mongoose.connect as jest.Mock).mockResolvedValueOnce(undefined); 
    await connectDB(); 
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI);
  });

  it('should throw an error if connection fails', async () => {
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(new Error('Connection failed')); 
    
    await expect(connectDB()).rejects.toThrow('MongoDB connection failed'); 
  });
});
