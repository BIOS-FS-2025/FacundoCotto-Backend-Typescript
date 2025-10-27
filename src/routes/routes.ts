import { Router } from "express";
import authRoutes from "./auth.routes";
import taskRoutes from "./task.routes";

import adminRoutes from "./admin.routes";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

// Authentication routes
router.use("/auth", authRoutes);

// Task routes
router.use("/tasks", taskRoutes);

// Admin routes
router.use("/admin", requireAuth, adminRoutes)

export default router;
