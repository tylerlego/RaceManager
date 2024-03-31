import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const RaceRegistration = require("../models/race-registration.model");

router.post('/', async (req: Request, res: Response) => {
  try {
    // Save new registration
    const raceRegistration = mongoose.model('RaceRegistration', RaceRegistration.schema);
    const newRaceRegistration = new raceRegistration(req.body);
    const result = await newRaceRegistration.save();
    res.send({msg: 'Successfully submitted race registration!', result});
  } catch (error) {
    console.error('Failed to save', error);
    res.status(500).send({msg: 'Failed to save', error});  
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    // Get all registrations
    const raceRegistration = mongoose.model('RaceRegistration', RaceRegistration.schema);
    const result = await raceRegistration.
      find().
      populate("desiredClass").
      populate("desiredCar").
      populate("event").
      exec();
    res.send({msg: 'Successfully got race registration data!', result});
  } catch (error) {
    console.error('Failed to get race registrations', error);
    res.status(500).send({msg: 'Failed to get race registrations', error}); 
  }
});

module.exports = router;