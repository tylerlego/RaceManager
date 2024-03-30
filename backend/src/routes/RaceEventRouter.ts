import express, { Request, Response } from 'express';
import { DbClient } from "../db/DbClient";

const dbClient = new DbClient();
const router = express.Router();

const initCollection = async () => {
  const connection = await dbClient.connect();
  return await connection?.collection("RaceEvent");
};

router.get('/', async (req: Request, res: Response) => {
  try {
    // Get all events
    const collection = await initCollection();
    const result = await collection?.find().toArray();
    res.send({msg: 'Successfully got event data!', result});
  } catch (error) {
    console.error('Failed to get', error);
    res.status(500).send({msg: 'Failed to get', error}); 
  }
});

module.exports = router;