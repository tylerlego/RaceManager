import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const RaceEvent = require("../models/race-event.model");

router.get('/', async (req: Request, res: Response) => {
  try {
    // Get all events
    const raceEvent = mongoose.model('RaceEvent', RaceEvent.schema);
    const result = await raceEvent.find().populate('carClasses').exec();
    res.send({msg: 'Successfully got race event data!', result});
  } catch (error) {
    console.error('Failed to get race events', error);
    res.status(500).send({msg: 'Failed to get race events', error}); 
  }
});

router.post('/create', async (req: Request, res: Response) => {
  try {
    // Get all events
    const raceEvent = mongoose.model('RaceEvent', RaceEvent.schema);
    const newEvent = new raceEvent(req.body);
    const result = await newEvent.save();
    res.send({msg: 'Successfully created race event!', result});
  } catch (error) {
    console.error('Failed to create race event', error);
    res.status(500).send({msg: 'Failed to create race event', error}); 
  }
});

module.exports = router;