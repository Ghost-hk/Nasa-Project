import mongoose from "mongoose";

export const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
    unic: true,
  },
  mission: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export const launchesModel = mongoose.model("Launch", launchesSchema);
