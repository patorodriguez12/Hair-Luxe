import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { Service } from "../entities/Services";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "3996161812",
  database: "hairluxe",
  // dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [User, Appointment, Service],
  subscribers: [],
  migrations: [],
});
