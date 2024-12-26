import { Router } from "express";
import { getUsers, getUserById, loginUser, registerUser } from "../controllers/usersControllers";
import { getAppointmentById, getAppointments, scheduleAppointment, cancelAppointment } from "../controllers/appointmentsControllers";
import { getServices, getServiceById, createService } from "../controllers/servicesController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const router = Router();

// users routes
router.get("/users", authMiddleware, getUsers);
router.get("/users/:id", authMiddleware, getUserById);
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

// appointments routes
router.get("/appointments", authMiddleware, getAppointments);
router.get("/appointments/:id", authMiddleware, getAppointmentById);
router.post("/appointments/schedule", authMiddleware, scheduleAppointment);
router.put("/appointments/cancel/:id", authMiddleware, cancelAppointment);

// services routes
router.get("/services", getServices);
router.get("/services/:id", getServiceById);
router.post("/services", authMiddleware, createService);

export default router;