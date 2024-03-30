import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
const homeRouter = require('../routes/IndexRouter');
const raceRegistrationRouter = require('../routes/RaceRegistrationRouter');
const carRouter = require('../routes/CarsRouter');
const raceEventRouter = require('../routes/RaceEventRouter');

dotenv.config();

const app: Express = express();
const port = process.env.EXPRESS_PORT || 4000;

app.use(cors<Request>());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/home', homeRouter);
app.use('/race/registration', raceRegistrationRouter);
app.use('/car', carRouter);
app.use('/events', raceEventRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});