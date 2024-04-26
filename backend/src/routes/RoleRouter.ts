import express from 'express';
import { Role } from '../models/role.model';
import mongoose from 'mongoose';
const router = express.Router();

router.post('/create', async (req, res) => {
  res.send('ROLE ROUTER: create roles');

  // try {
  //   const roles = [
  //     { name: 'admin' }, 
  //     { name: 'user' },
  //     { name: 'staff' }
  //   ];

  //   const result = await Role.collection.insertMany(roles);
  //   res.send({msg: 'Successfully created roles!', result});
  // } catch (error) {
  //   console.error('Failed to create roles', error);
  //   res.status(500).send({msg: 'Failed to create roles', error}); 
  // }
});

router.get('/', async (req, res) => { 
  try {
    // Get all roles
    const role = mongoose.model('Role', Role.schema);
    const result = await role.find().exec();
    res.send({msg: 'Successfully got roles data!', result});
  } catch (error) {
    console.error('Failed to get roles', error);
    res.status(500).send({msg: 'Failed to get roles', error}); 
  }
});

module.exports = router;