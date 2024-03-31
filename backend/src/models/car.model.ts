import mongoose from "mongoose";

export const Car = mongoose.model(
    "Car",
    new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Car name is required"],
      },
      class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarClass"
      }
      
    }, { collection: 'Car' })
  );