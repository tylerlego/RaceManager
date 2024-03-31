import mongoose from "mongoose";

export const RaceRegistration = mongoose.model(
    "RaceRegistration",
    new mongoose.Schema({
      firstName: {
        type: String,
        required: [true, "First name is required"],
      },
      lastName: {
        type: String,
        required: [true, "Last name is required"],
      },
      desiredClass: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarClass",
        required: [true, "Desired car class is required"],
      },
      desiredCar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: [true, "Desired car is required"],
      },
      event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RaceEvent",
        required: [true, "Race event is required"],
      }
    }, { collection: 'RaceRegistration' })
  );