import express, { Request, Response } from 'express';
import { DbClient } from "../db/DbClient";

const dbClient = new DbClient();
const router = express.Router();

const initCollection = async (collectionName: string) => {
  const connection = await dbClient.connect();
  return await connection?.collection(collectionName);
};

router.get('/', async (req: Request, res: Response) => {
  try {
    // Get all cars
    const collection = await initCollection("Car");
    const result = await collection?.find().toArray();
    res.send({msg: 'Successfully got car data!', result});
  } catch (error) {
    console.error('Failed to save', error);
    res.status(500).send({msg: 'Failed to save', error}); 
  }
});

router.get('/classes', async (req: Request, res: Response) => {
  try {
    // Get all car classes
    const connection = await dbClient.connect();
    const collection = await connection?.collection("CarClass");
    const result = await collection?.find().toArray();
    res.send({msg: 'Successfully got car class data!', result});
  } catch (error) {
    console.error('Failed to get', error);
    res.status(500).send({msg: 'Failed to get', error}); 
  }
});

module.exports = router;