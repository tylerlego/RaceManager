import express from 'express';
import { User } from '../models/user.model';
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const mg = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'tyler@gmail.com',
      password: 'password',
      roles: ['6608794728ed2a12d638c874']
    });
    
    const result = await mg.save();
    res.send({msg: 'Successfully created user!', result});

  } catch (error) {
    console.error('Failed to get', error);
    res.status(500).send({msg: 'Failed to get', error}); 
  } 
  res.send('USER CREATED: ', );
});

router.get('/', (req, res) => { 
    res.send('USER ROUTER: index');
  });

module.exports = router;