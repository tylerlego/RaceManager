import express from 'express';
const router = express.Router();
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();

const discordFailureRedirect = process.env.ENVIRONMENT === 'prod' ?
  `${process.env.CLIENT_BASE_URL}${process.env.DISCORD_AUTH_FAILURE_REDIRECT_PATH}` :
  `${process.env.LOCAL_CLIENT_BASE_URL}${process.env.DISCORD_AUTH_FAILURE_REDIRECT_PATH}`;
const discordSuccessRedirect = process.env.ENVIRONMENT === 'prod' ?
  `${process.env.CLIENT_BASE_URL}${process.env.DISCORD_AUTH_SUCCESS_REDIRECT_PATH}` :
  `${process.env.LOCAL_CLIENT_BASE_URL}${process.env.DISCORD_AUTH_SUCCESS_REDIRECT_PATH}`;

router.get('/login/discord', passport.authenticate('discord'));

router.get('/redirect/discord', passport.authenticate('discord', {
  failureRedirect: discordFailureRedirect,
  successRedirect: discordSuccessRedirect 
}));

// Get auth user
router.get('/auth-user', async (req: any, res) => {
  if (req.user === undefined) {
    return res.json();
  }

  const userRoles = await req.discordBotClient.guilds.fetch({ guild: process.env.JJC_GUILD_ID || ''})
    .then((guild: any) => guild.members.fetch())
    .then((members: any) => members.get(req.user.discordId)?.roles.cache
    .map((role: any) => role.name));

  req.user = {
    ...req.user,
    roles: userRoles
  };
  res.json(req.user);
});

module.exports = router;