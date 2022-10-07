import http from "http";
import app from "./app.js";

import { loadPlanetsData } from "./models/planets.models.js";

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const startServer = async () => {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.clear();
    console.log(`Server listening on port ${PORT}...`);
  });
};

startServer();
