import { TaskController } from '../controllers/task.controller';
import { requireAuth } from '../middlewares/auth.middleware';
import { validate, validateId } from '../middlewares/validate.middleware';
import { createTaskSchema, editTaskSchema, taskIdValidations, userIdValidations } from '../schemas/task.schema';
import { TaskService } from '../services/task.service';
import { TaskRepository } from './../repositories/task.repository';
import { Router } from "express";

const router = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// Create a new task
router.post("/create", requireAuth, validate(createTaskSchema), taskController.createTask);

// Edit a task
router.put("/edit/:id", requireAuth, validate(editTaskSchema), validateId(taskIdValidations), taskController.editTask);

// Delete a task
router.delete("/delete/:id", requireAuth, validateId(taskIdValidations), taskController.deleteTask);
    
// Get all tasks for a user
router.get("/:userId", requireAuth, validateId(userIdValidations),  taskController.getTaskByUser);

// Get task by id
router.get("/id/:id", requireAuth, validateId(taskIdValidations), taskController.getTaskById);

// // Get tasks by due date
// router.get("/due-date/:date");

// // Get tasks by priority
// router.get("/priority/:priority");

// // Get tasks by subject
// router.get("/subject/:subject");

export default router;