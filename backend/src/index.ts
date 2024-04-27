import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
const passport = require('passport');
const session = require('express-session');
const db = require('./db/database-client');
const homeRouter = require('./routes/IndexRouter');
const raceRegistrationRouter = require('./routes/RaceRegistrationRouter');
const carRouter = require('./routes/CarsRouter');
const raceEventRouter = require('./routes/RaceEventRouter');
const authRouter = require('./routes/AuthRouter');
const userRouter = require('./routes/UserRouter');
const roleRoter = require('./routes/RoleRouter');
const { isAuthenticated } = require('./middleware/auth');
dotenv.config();
require('./strategies/discordstrategy');

const app: Express = express();
const port = process.env.EXPRESS_PORT || 4000;

const corsOrigins = [
  process.env.LOCAL_CLIENT_BASE_URL || '',
  process.env.CLIENT_BASE_URL || '',
  process.env.LOCAL_SERVER_BASE_URL || '',
  process.env.SERVER_BASE_URL || '',
]
// console.log("cors origins", corsOrigins);
console.log("TESTING UP 3");

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  

app.use(session({
  secret: process.env.COOKIE_KEY,
  cookie: {
    maxAge: 60000 * 60 * 24 * 2, // 2 days
    sameSite: 'none',
  },
  name: 'discord.oauth2',
  // resave: false,
  // saveUninitialized: false,
}));

db.then((res: any) => {
  console.log("DB CLIENT CONNECTED:", res?.connection.host);
}).catch((error: any) => {
  console.error('Failed to connect to database', error);
});

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

app.use('/api/auth', authRouter);
app.use('/api/home', homeRouter);
app.use('/api/race/registration', isAuthenticated, raceRegistrationRouter);
app.use('/api/car', isAuthenticated, carRouter);
app.use('/api/events', isAuthenticated, raceEventRouter);
app.use('/api/user', isAuthenticated, userRouter);
app.use('/api/role', isAuthenticated, roleRoter);

app.listen(port, () => {
  console.log(`[server]: Server is running on port: ${port}`);
});