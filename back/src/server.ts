import express from "express";
import router from "./routes/routes";
const cors = require("cors");

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

const server = express();
server.use(express.json());
server.use(router);
server.use(cors(corsOptions));

export default server;
