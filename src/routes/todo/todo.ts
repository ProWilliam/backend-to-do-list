import { Router } from 'express';
import Todo from '../../models/todo/Todo';
import { authenticateToken } from '../../middleware/auth';
import { AuthenticatedRequest } from '../../types/AuthenticatedRequest';

const router = Router();

// Create a task
router.post('/', authenticateToken, async (req: AuthenticatedRequest, res) => {

  if(!req.user){
    return res.status(403).send('User not authenticated');
  }

  try{
    const todo = new Todo({ 
      text: req.body.text, 
      user: req.user.id 
    });
  
    await todo.save();
  
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error Create task', error });
  }
  
});

// Get user tasks
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res) => {

  if(!req.user){
    return res.status(403).send('User not authenticated');
  }

  try{
    const todos = await Todo.find({ user: req.user.id });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error Get task', error });
  }
});

// Update task
router.put('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {

  try{
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error Update task', error });
  }
  
});

// Delete task
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {

  try {
    await Todo.findByIdAndDelete(req.params.id);
  
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error Delete task', error });
  }
});

export default router;
