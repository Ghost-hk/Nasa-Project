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

launches.set(launch.flightNumber, launch);

export const GetAllLaunchsFromModel = () => {
  return Array.from(launches.values());
};

export const addNewLaunchToModel = (launch) => {
  latestFlightNumber++;
  launches.set(latestFlightNumber, {
    ...launch,
    flightNumber: latestFlightNumber,
    customers: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
  });
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
