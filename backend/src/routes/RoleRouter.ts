import express from 'express';
import { Role } from '../models/role.model';
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

router.get('/', (req, res) => { 
  res.send('ROLE ROUTER: get roles');
});

module.exports = router;