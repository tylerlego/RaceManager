import mongoose from "mongoose";

interface IUser {
  _id: string;
  email: string;
  discordId: string;
  discordUsername: string;
  discordAvatar: string;
  accessToken: string;
  refreshToken: string;
}

const User = mongoose.model(
  "User",
  new mongoose.Schema<IUser>({
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    discordId: {
      type: String,
    },
    discordUsername: {
      type: String,
    },
    discordAvatar: {
      type: String,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  }, { collection: 'User' })
);

export { User, IUser };