import mongoose from "mongoose";

export const CarClass = mongoose.model(
    "CarClass",
    new mongoose.Schema({
      name: String,
    }, { collection: 'CarClass' })
  );