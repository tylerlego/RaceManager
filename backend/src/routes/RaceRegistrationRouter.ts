import express, { Request, Response } from 'express';
import { DbClient } from "../db/DbClient";

const dbClient = new DbClient();
const router = express.Router();

const initCollection = async () => {
  const connection = await dbClient.connect();
  return await connection?.collection("RaceRegistration");
};

router.post('/', async (req: Request, res: Response) => {
  console.log('Race registration data received', req.body);
  try {
    // Save new registration
    const collection = await initCollection();
    const result = await collection?.insertOne(req.body);
    res.send({msg: 'Successfully submitted race registration!', result});
  } catch (error) {
    console.error('Failed to save', error);
    res.status(500).send({msg: 'Failed to save', error});  
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    // Get all registrations
    const collection = await initCollection();
    const result = await collection?.find().toArray();
    res.send({msg: 'Successfully got race registration data!', result});
  } catch (error) {
    console.error('Failed to get', error);
    res.status(500).send({msg: 'Failed to get', error}); 
  }
});

module.exports = router;