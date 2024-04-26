import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const router = express.Router();
const Car = require("../models/car.model");
const CarClass = require("../models/car-class.model");

router.get('/', async (req: any, res: Response) => {
  try {
    // Get all cars
    const car = mongoose.model('Car', Car.schema);
    const result = await car.find().populate('class').exec();
    res.send({msg: 'Successfully got car data!', result});
  } catch (error) {
    console.error('Failed to save', error);
    res.status(500).send({msg: 'Failed to save', error}); 
  }
});

router.get('/classes', async (req: Request, res: Response) => {
  try {
    // Get all car classes
    const carClass = mongoose.model('CarClass', CarClass.schema);
    const result = await carClass.find().exec();
    res.send({msg: 'Successfully got car class data!', result});
  } catch (error) {
    console.error('Failed to get car class data', error);
    res.status(500).send({msg: 'Failed to get car class data', error}); 
  }
});

// router.post('/', async (req: Request, res: Response) => {
//   try {
//     // Save new car
//     const car = mongoose.model('Car', Car.schema);
//     const newCar = new car(req.body);
//     const result = await newCar.save();
//     res.send({msg: 'Successfully saved car data!', result});
//   } catch (error) {
//     console.error('Failed to save', error);
//     res.status(500).send({msg: 'Failed to save', error}); 
//   }
// });

module.exports = router;