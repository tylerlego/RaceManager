import express from 'express';
import { IRole, Role } from '../models/role.model';
import mongoose from 'mongoose';
import assert from 'assert';

const router = express.Router();

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