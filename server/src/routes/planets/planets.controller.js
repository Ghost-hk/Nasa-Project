import { getAllPlanetsFromModel } from "../../models/planets.models.js";

export const getAllPlanets = async (req, res) => {
  return res.status(200).json(await getAllPlanetsFromModel());
};
