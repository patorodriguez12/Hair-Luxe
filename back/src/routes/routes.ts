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
import { getServices, getServiceById, createService } from "../controllers/servicesController";
const router = Router();

// users routes
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users/register", registerUser);
router.post("/users/login", loginUser)

// appointments routes
router.get("/appointments", getAppointments);
router.get("/appointments/:id", getAppointmentById);
router.post("/appointments/schedule", scheduleAppointment);
router.put("/appointments/cancel/:id", cancelAppointment);

// services routes
router.get("/services", getServices);
router.get("/services/:id", getServiceById);
router.post("/services", createService);

export default router;
