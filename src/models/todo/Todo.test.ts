import mongoose from 'mongoose';
const mockingoose = require('mockingoose');
import Todo from './Todo';

describe('Todo model test', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should create a new todo', async () => {
    const todoData = {
      text: 'Test todo',
      completed: false,
      user: new mongoose.Types.ObjectId(),
    };

    mockingoose(Todo).toReturn(todoData, 'save');

    const todo = new Todo(todoData);
    const savedTodo = await todo.save();

    expect(savedTodo.text).toBe(todoData.text);
    expect(savedTodo.completed).toBe(todoData.completed);
    expect(savedTodo.user).toEqual(todoData.user);
  });

  it('should find a todo by id', async () => {
    const todoData = {
      _id: new mongoose.Types.ObjectId(),
      text: 'Test todo',
      completed: false,
      user: new mongoose.Types.ObjectId(),
    };

    mockingoose(Todo).toReturn(todoData, 'findOne');

    const foundTodo = await Todo.findById(todoData._id);

    if (foundTodo) {
      expect(foundTodo.text).toBe(todoData.text);
      expect(foundTodo.completed).toBe(todoData.completed);
      expect(foundTodo.user).toEqual(todoData.user);
    } else {
      throw new Error('Todo not found');
    }
  });
});
