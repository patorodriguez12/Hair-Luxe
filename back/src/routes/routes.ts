import { Router } from "express";

const router = Router();

// users routes
router.get("/users", () => {})
router.get("/users/:id", () => {})
router.post("/users/register", () => {})
router.post("/users/login", () => {})

// appointments routes
router.get("/appointments", () => {})
router.get("/appointments/:id", () => {})
router.post("/appointments/schedule", () => {})
router.put("/appointments/cancel", () => {})

export default router;
