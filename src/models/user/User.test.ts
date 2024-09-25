import mongoose from 'mongoose';
const mockingoose = require('mockingoose');
import User, { IUser } from './User'; 

describe('User Model', () => {
  beforeEach(async () => {
    mockingoose.resetAll();
  });

  it('should create a new user', async () => {
    const userData: Partial<IUser> = {
      username: 'testuser',
      password: 'testpass',
      _id: new mongoose.Types.ObjectId(),
    };

    mockingoose(User).toReturn(userData, 'save');
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(userData.username);
    expect(savedUser.password).toBe(userData.password);
  });

  it('should not create a user without username', async () => {
    const userData: Partial<IUser> = {
      password: 'testpass',
      
    };

    const user = new User(userData);
    let error: any;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.username).toBeDefined();
  });
});
