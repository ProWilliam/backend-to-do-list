import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  text: string;
  completed: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const todoSchema: Schema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
});

export default mongoose.model<ITodo>('Todo', todoSchema);