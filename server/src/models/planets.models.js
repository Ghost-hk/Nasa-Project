import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { parse } from "csv-parse";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const planets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

export const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          planets.push(data);
        }
      })
      .on("error", (err) => {
        console.error(err);
        reject(err);
      })
      .on("end", () => {
        console.log(`${planets.length} habitable planets found!`);
        resolve();
      });
  });
};

export default planets;