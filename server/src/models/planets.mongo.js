import mongoose from "mongoose";

export const planetSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
    unic: true,
  },
});

export const planetsModel = mongoose.model("Planet", planetSchema);
