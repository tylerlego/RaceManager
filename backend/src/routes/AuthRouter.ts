import express from 'express';
const router = express.Router();
const passport = require('passport');
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const { isAuthenticated } = require('../middleware/auth');
dotenv.config();

const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ]
});
const discordFailureRedirect = process.env.ENVIRONMENT === 'prod' ?
  `${process.env.CLIENT_BASE_URL}${process.env.DISCORD_AUTH_FAILURE_REDIRECT_PATH}` :
  `${process.env.LOCAL_CLIENT_BASE_URL}${process.env.DISCORD_AUTH_FAILURE_REDIRECT_PATH}`;
const discordSuccessRedirect = process.env.ENVIRONMENT === 'prod' ?
  `${process.env.CLIENT_BASE_URL}${process.env.DISCORD_AUTH_SUCCESS_REDIRECT_PATH}` :
  `${process.env.LOCAL_CLIENT_BASE_URL}${process.env.DISCORD_AUTH_SUCCESS_REDIRECT_PATH}`;

discordClient.login(process.env.DISCORD_BOT_TOKEN);

router.get('/login/discord', passport.authenticate('discord'));

router.get('/redirect/discord', passport.authenticate('discord', {
  failureRedirect: discordFailureRedirect,
  successRedirect: discordSuccessRedirect,
}), (req: any, res: any) => {
  res.send('Successfully logged in');
});

module.exports = router;