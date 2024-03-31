import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
const db = require('./models');
const homeRouter = require('./routes/IndexRouter');
const raceRegistrationRouter = require('./routes/RaceRegistrationRouter');
const carRouter = require('./routes/CarsRouter');
const raceEventRouter = require('./routes/RaceEventRouter');
const authRouter = require('./routes/AuthRouter');
const userRouter = require('./routes/UserRouter');
const roleRoter = require('./routes/RoleRouter');

dotenv.config();

const app: Express = express();
const port = process.env.EXPRESS_PORT || 4000;

app.use(cors<Request>());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.mongoose.connect(process.env.DB_CONNECTION_STRING || '').then((res: any) => {
  console.log("DB CLIENT CONNECTED:", res?.connection.host);
}).catch((error: any) => {
  console.error('Failed to connect to database', error);
});

app.use('/api/home', homeRouter);
app.use('/api/race/registration', raceRegistrationRouter);
app.use('/api/car', carRouter);
app.use('/api/events', raceEventRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/role', roleRoter);

app.listen(port, () => {
  console.log(`[server]: Server is running on port: ${port}`);
});