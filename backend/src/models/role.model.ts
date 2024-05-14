import mongoose from "mongoose";

interface IRole {
  _id?: string;
  name: string;
  discordRoleId: string;
}

const Role = mongoose.model(
  "Role",
  new mongoose.Schema(
    {
    name: {
      type: String,
      required: [true, "Role name is required"],
    },
    discordRoleId: {
      type: String,
      required: [true, "Discord Role ID is required"],
    },
  }, { collection: 'Role' })
);

export { Role, IRole };