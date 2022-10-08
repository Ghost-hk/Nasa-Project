import { response } from "express";
import {
  GetAllLaunchsFromModel,
  addNewLaunchToModel,
  launchExists,
  abortLaunchfromModel,
} from "../../models/launches.model.js";

export const getAllLaunches = (req, res) => {
  return res.status(200).json(GetAllLaunchsFromModel());
};

export const addNewLaunch = (req, res) => {
  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);

  if (
    !launch.launchDate ||
    !launch.mission ||
    !launch.rocket ||
    !launch.target
  ) {
    return res.status(400).json({ error: "Missing required launch property!" });
  }

  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({ error: "Invalid Date!" });
  }

  addNewLaunchToModel(launch);
  return res.status(201).json(launch);
};

export const abortLaunch = (req, res) => {
  const id = +req.params.id;

  if (!launchExists(id)) {
    return res.status(404).json({ error: "Launch not found!" });
  }

  const aborted = abortLaunchfromModel(id);
  return res.status(200).json(aborted);
};
