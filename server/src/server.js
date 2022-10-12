import http from "http";
import app from "./app.js";
import mongoose from "mongoose";

import { loadPlanetsData } from "./models/planets.models.js";

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://Dawdi:Badcop12@teksa.3o3pyoj.mongodb.net/teksa?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

const startServer = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  });
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.clear();
    console.log(`Server listening on port ${PORT}...`);
  });
};

startServer();
