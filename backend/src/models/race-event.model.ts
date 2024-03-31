import mongoose from "mongoose";

export const RaceEvent = mongoose.model(
    "RaceEvent",
    new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Event name is required"],
      },
      date:[      
        {
          type: Number,
        }
      ],
      track: {
        type: String,
        required: [true, "Track name is required"],
      },
      description: {
        type: String,
        required: [true, "Car name is required"],
      },
      participants: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],
      carClasses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CarClass"
        }
      ],
      imageURI: {
        type: String,
      },
    }, { collection: 'RaceEvent' })
  );