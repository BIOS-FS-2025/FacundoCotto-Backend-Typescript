import { TaskService } from "./../services/task.service";
import { TaskIdValidations } from "./../schemas/task.schema";
import { safeParse } from "zod";
import { ERRORS } from "../config/env";
import { Request, Response } from "express";
import { get } from "http";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Create a task
  createTask = async (req: Request, res: Response) => {
    const postData = req.body;
    const userId = req.userId as string;

    try {
      const newTask = await this.taskService.createTask(postData, userId);

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: {
          task: newTask,
        },
      });
    } catch (error) {
      console.error("Failed to create task:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: ERRORS.INTERNAL_ERROR,
      });
    }
  };

  // Get tasks by user
  getTaskByUser = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const filters = req.query;

    try {
      const tasks = await this.taskService.getTasksByUser(userId, filters);

      if (!tasks || tasks.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No tasks found for the user",
        });
      }

      res.status(200).json({
        success: true,
        message: "Tasks retrieved successfully",
        data: {
          tasks,
        },
      });
    } catch (error) {
      console.error("Failed to retrieve tasks:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: ERRORS.INTERNAL_ERROR,
      });
    }
  };

  getTaskById = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const _id = req.params.id;

    try {
      const task = await this.taskService.getTaskById(_id, userId);

      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Task retrieved successfully",
        data: {
          task,
        },
      });
    } catch (error) {
      console.error("Failed to retrieve task:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: ERRORS.INTERNAL_ERROR,
      });
    }
  };

  editTask = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const taskData = req.body;
    const _id = req.params.id;

    try {
      const editedTask = await this.taskService.editTask(userId, _id, taskData);

      if (!editedTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: {
          task: editedTask,
        },
      });
    } catch (error) {
      console.error("Failed to edit task:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: ERRORS.INTERNAL_ERROR,
      });
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const _id = req.params.id;

    try {
      const deletedTask = await this.taskService.deleteTask(_id, userId);
      if (!deletedTask) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: {
          task: deletedTask,
        },
      });
    } catch (error) {
      console.error("Failed to delete task:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: ERRORS.INTERNAL_ERROR,
      });
    }
  };
}
