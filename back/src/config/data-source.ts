import { DataSource } from "typeorm";
import { User } from "../entities/User";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "3996161812",
    database: "hairluxe",
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
})