import { Router } from "express";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";

const router = Router();

// Authentication routes
router.use("/auth", authRoutes);

// Task routes
router.use("/tasks", taskRoutes);

export default router;
