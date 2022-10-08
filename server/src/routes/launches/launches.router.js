import express from "express";

import {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
} from "./launches.controller.js";

const launchesRouter = express.Router();

launchesRouter.get("/", getAllLaunches);
launchesRouter.post("/", addNewLaunch);
launchesRouter.delete("/:id", abortLaunch);

export { launchesRouter };
