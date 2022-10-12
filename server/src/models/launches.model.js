import { launchesModel } from "./launches.mongo.js";
import { planetsModel } from "./planets.mongo.js";

const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

export const getlatestFlightNumber = async () => {
  const latestLaunch = await launchesModel.findOne().sort("-flightNumber");

  if (!latestLaunch) return 100;

  return latestLaunch.flightNumber;
};

export const GetAllLaunchsFromModel = async () => {
  try {
    return await launchesModel.find({}, { _id: 0, __v: 0 });
  } catch (err) {
    console.error(err);
  }
};

export const saveLaunch = async (launch) => {
  const planet = await planetsModel.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("no planet found");
  }

  try {
    await launchesModel.updateOne(
      { flightNumber: launch.flightNumber },
      launch,
      {
        upsert: true,
      }
    );
  } catch (e) {
    console.error(e);
  }
};

saveLaunch(launch);

export const addNewLaunchToModel = async (launch) => {
  const newFlightNumber = (await getlatestFlightNumber()) + 1;

  const newLanch = {
    ...launch,
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNumber,
  };

  await saveLaunch(newLanch);
};

export const launchExists = (id) => {
  return launches.has(id);
};

export const abortLaunchfromModel = (id) => {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
};
