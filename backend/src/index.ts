import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Client, Events, GatewayIntentBits, Guild } from "discord.js";
import { IRole, Role } from "./models/role.model";
import assert from "assert";
import mongoose from "mongoose";
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
const cookieParser = require('cookie-parser');

dotenv.config();
require('./strategies/discordstrategy');

const app: Express = express();
const port = process.env.EXPRESS_PORT || 4000;

// const corsOrigins = [
//   process.env.LOCAL_CLIENT_BASE_URL || '',
//   process.env.CLIENT_BASE_URL || '',
//   process.env.LOCAL_SERVER_BASE_URL || '',
//   process.env.SERVER_BASE_URL || '',
// ]
// console.log("cors origins", corsOrigins);x

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());  

const sessionConfig: any = {
  secret: process.env.COOKIE_KEY,
  cookie: {
    maxAge: 60000 * 60 * 24 * 30, // 30 days
    keys: [process.env.COOKIE_KEY],
  },
  name: 'discord.oauth2',
  resave: false,
  saveUninitialized: false,
};

if (process.env.ENVIRONMENT === 'prod') {
  app.set('trust proxy', 1);
  sessionConfig.cookie.secure = true;
  sessionConfig.cookie.sameSite = 'none';
}

app.use(session(sessionConfig));

db.then((res: any) => {
  console.log("DB CLIENT CONNECTED:", res?.connection.host);
}).catch((error: any) => {
  console.error('Failed to connect to database', error);
});

const discordBotClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
discordBotClient.login(process.env.DISCORD_BOT_TOKEN);

discordBotClient.once(Events.ClientReady, async (readyClient: Client) => {
	console.log(`Discord client ready! Logged in as ${readyClient.user}`);
  const currentRoles: IRole[] | undefined = readyClient.guilds.cache.get(process.env.JJC_GUILD_ID || '')?.roles.cache.map((role: any) => {
    const roleData: IRole = {
      name: role.name,
      discordRoleId: role.id,
    };
    return roleData;
  });

  if (!currentRoles) {
    console.error('Failed to get current roles');
    return;
  }

  const role = mongoose.model('Role', Role.schema);
  mongoose.startSession().then((session: any) => {
   session.withTransaction(async () => {
    await role.deleteMany({}, { session: session });
    await role.insertMany(currentRoles, { session: session });
  })
    .then(() => Role.countDocuments())
    .then((count: Number) => assert.strictEqual(count, currentRoles?.length, 'Failed to save current roles to Role collection'))
    .then(() => session.endSession());
  });
});

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use(cookieParser());

const getDiscordClient = (req: any, res: any, next: any) => {
  if (discordBotClient.isReady()) {
    req.discordBotClient = discordBotClient;
    next();
  } else {
    discordBotClient.once(Events.ClientReady, (readyClient: any) => {
      req.discordBotClient = readyClient;
      next();
    });
  }
}

app.use('/api/auth', getDiscordClient, authRouter);
app.use('/api/home', homeRouter);
app.use('/api/race/registration', isAuthenticated, raceRegistrationRouter);
app.use('/api/car', isAuthenticated, carRouter);
app.use('/api/events', isAuthenticated, raceEventRouter);
app.use('/api/user', isAuthenticated, userRouter);
app.use('/api/role', getDiscordClient, roleRoter);

app.listen(port, () => {
  console.log(`[server]: Server is running on port: ${port}`);
});