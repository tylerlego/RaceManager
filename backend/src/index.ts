import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Client, Events, GatewayIntentBits } from "discord.js";
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
// const { Client, Events, GatewayIntentBits, GuildManager } = require('discord.js');

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

const discordBotClient = new Client({ intents: [GatewayIntentBits.Guilds] });

discordBotClient.once(Events.ClientReady, (readyClient: any) => {
	console.log(`Ready! Logged in as ${readyClient.user}`);
  readyClient.guilds.cache.forEach((guild: any) => {
    // console.log("GUILD", guild.roles.cache);
    for (const [key, value] of guild.roles.cache) {
      console.log("ROLE", key, value.name);
    }
  });
});

// // Log in to Discord with your client's token
discordBotClient.login(process.env.DISCORD_BOT_TOKEN);
// discordBotClient.fetchGuildPreview(process.env.JJC_GUILD_ID).then((guild: any) => {
//   console.log("GUILD?", guild.guild);
// });

// const guildManager = new GuildManager(discordBotClient);
// console.log("guild manager", guildManager.guilds);

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));
app.use(cookieParser());

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