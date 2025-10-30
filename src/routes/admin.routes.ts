import { AdminController } from './../controllers/admin.controller';
import { editUserSchema, registerSchema } from './../schemas/auth.schema';
import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { AdminService } from '../services/admin.service';
import { UserRepository } from '../repositories/user.repository';
import { requireAdmin } from "../middlewares/admin.middleware";

const router = Router();

const userRepository = new UserRepository();
const adminService = new AdminService(userRepository);
const adminController = new AdminController(adminService);

router.post("/create-user", requireAdmin, validate(registerSchema), adminController.createUser);

router.get("/users", requireAdmin, adminController.getAllUsers);

router.put("/update-user/:id", requireAdmin, validate(editUserSchema),  adminController.updateUser);

router.delete("/delete-user/:id", requireAdmin, adminController.deleteUser);

export default router;