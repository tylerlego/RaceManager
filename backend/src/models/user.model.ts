import mongoose from "mongoose";

export const User = mongoose.model(
    "User",
    new mongoose.Schema({
      firstName: {
        type: String,
        required: [true, "First name is required"],
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ]
    }, { collection: 'User' })
  );