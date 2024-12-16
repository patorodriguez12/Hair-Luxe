import { Router } from "express";
import {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
} from "../controllers/usersControllers";

const router = Router();

// users routes
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

// appointments routes
router.get("/appointments", () => {});
router.get("/appointments/:id", () => {});
router.post("/appointments/schedule", () => {});
router.put("/appointments/cancel", () => {});

export default router;
