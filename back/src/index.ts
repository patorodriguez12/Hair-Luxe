import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then((res) => {
  console.log("Connected to data base successfully");
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

// server.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
