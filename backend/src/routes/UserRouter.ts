import express from 'express';
import { User } from '../models/user.model';
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

// Create a new user
router.post('/create', async (req, res) => {
  // ...
});

// Get auth user
router.get('/auth-user', (req: any, res) => {
  res.json(req.user);
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }
    console.log('User:', user);
    res.send(user);
  } catch (error) {
    console.error('Failed to get user', error);
    res.status(500).send({ msg: 'Failed to get user', error });
  }
});

// // Get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.send(users);
//   } catch (error) {
//     console.error('Failed to get users', error);
//     res.status(500).send({msg: 'Failed to get users', error}); 
//   }
// });


module.exports = router;

