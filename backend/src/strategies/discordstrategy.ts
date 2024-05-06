import { User, IUser } from "../models/user.model";

const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const discordCallbackURL = process.env.ENVIRONMENT === 'prod' ? 
  `${process.env.SERVER_BASE_URL}${process.env.DISCORD_REDIRECT_PATH}` :
  `${process.env.LOCAL_SERVER_BASE_URL}${process.env.DISCORD_REDIRECT_PATH}`;

passport.use(new DiscordStrategy({
  clientID: process.env.DISCORD_CLIENT_ID,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  callbackURL: discordCallbackURL,
  scope: ['identify', 'email', 'guilds', 'guilds.members.read'],
  passReqToCallback: true,
}, async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
  // console.log("PROFILE", profile);
  console.log("ACCESS TOKEN", accessToken);
  console.log("REFRESH TOKEN", refreshToken);
  if (profile.guilds.some((guild: any) => guild.id === process.env.JJC_GUILD_ID)) {
    try {
      const user: IUser | null = await User.findOne({ discordId: profile.id });
      if (user) {
        done(null, user);
      } else {
        const newUser: IUser = await User.create({
          email: profile.email,
          discordId: profile.id,
          discordUsername: profile.username,
          discordAvatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
        done(null, newUser);
      }
    } catch (err) {
      console.error('Failed to get or create user', err);
      return done(err, null);
    }
  }

  passport.serializeUser((user: IUser, done: any) => {
    process.nextTick(() => {
      return done(null, user);
    });
  });
  
  passport.deserializeUser(async (user: IUser, done: any) => {
    process.nextTick(async () => {
      return done(null, user);
    });
  });
}));