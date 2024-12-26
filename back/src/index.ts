import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import {
  preloadUserData,
  preloadServicesData,
  preloadAppointmentsData,
} from "./helpers/preloadData";

const initializeApp = async () => {
  await AppDataSource.initialize();
  await preloadUserData();
  await preloadServicesData();
  await preloadAppointmentsData();
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

initializeApp();
