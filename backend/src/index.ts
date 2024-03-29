import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { DbClient } from "../db/DbClient";

dotenv.config();

const app: Express = express();
const port = process.env.EXPRESS_PORT || 4000;
const dbClient = new DbClient();

app.use(cors<Request>());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/api/race/registration', async (req: Request, res: Response) => {
  console.log('Race registration data received', req.body);
  try {
    // Save new registration
    const connection = await dbClient.connect();
    const collection = await connection?.collection("RaceRegistration");
    const result = await collection?.insertOne(req.body);
    res.send({msg: 'Successfully submitted race registration!', result});
  } catch (error) {
    console.error('Failed to save', error);
    res.status(500).send({msg: 'Failed to save', error}); 
  }
});

app.get('/api/race/registration', async (req: Request, res: Response) => {
  try {
    // Get all registrations
    const connection = await dbClient.connect();
    const collection = await connection?.collection("RaceRegistration");
    const result = await collection?.find().toArray();
    res.send({msg: 'Successfully got race registration data!', result});
  } catch (error) {
    console.error('Failed to get', error);
    res.status(500).send({msg: 'Failed to get', error}); 
  }
});

app.get('/api/cars/classes', async (req: Request, res: Response) => {
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

app.get('/api/cars', async (req: Request, res: Response) => {
  try {
    // Get all car classes
    const connection = await dbClient.connect();
    const collection = await connection?.collection("Car");
    const result = await collection?.find().toArray();
    res.send({msg: 'Successfully got car data!', result});
  } catch (error) {
    console.error('Failed to get', error);
    res.status(500).send({msg: 'Failed to get', error}); 
  }
});

app.get('/api/events', async (req: Request, res: Response) => {
  try {
    // Get all events
    const connection = await dbClient.connect();
    const collection = await connection?.collection("RaceEvent");
    const result = await collection?.find().toArray();
    res.send({msg: 'Successfully got event data!', result});
  } catch (error) {
    console.error('Failed to get', error);
    res.status(500).send({msg: 'Failed to get', error}); 
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});