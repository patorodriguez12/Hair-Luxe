import { Router } from "express";
import {
  getUsers,
  getUserById,
  registerUser,
  loginUser
} from "../controllers/usersControllers";
import {
  cancelAppointment,
  getAppointmentById,
  getAppointments,
  scheduleAppointment,
} from "../controllers/appointmentsControllers";
const cors = require("cors");

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}

const router = Router();

// users routes
router.get("/users", cors(corsOptions), getUsers);
router.get("/users/:id", cors(corsOptions), getUserById);
router.post("/users/register", cors(corsOptions), registerUser);
router.post("/users/login", cors(corsOptions), loginUser)

// appointments routes
router.get("/appointments", cors(corsOptions), getAppointments);
router.get("/appointments/:id", cors(corsOptions), getAppointmentById);
router.post("/appointments/schedule", cors(corsOptions), scheduleAppointment);
router.put("/appointments/cancel/:id", cors(corsOptions), cancelAppointment);

export default router;
