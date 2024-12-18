import { Router } from "express";
import {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
} from "../controllers/usersControllers";
import {
  cancelAppointment,
  getAppointmentById,
  getAppointments,
  scheduleAppointment,
} from "../controllers/appointmentsControllers";

const router = Router();

// users routes
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

// appointments routes
router.get("/appointments", getAppointments);
router.get("/appointments/:id", getAppointmentById);
router.post("/appointments/schedule", scheduleAppointment);
router.put("/appointments/cancel/:id", cancelAppointment);

export default router;
