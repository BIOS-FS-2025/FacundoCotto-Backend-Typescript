import { TaskService } from "./../services/task.service";
import { Request, Response } from "express";

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
      });
    }
  };

  // Get tasks by user
  getTaskByUser = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const filters = req.query;

    try {
      const tasks = await this.taskService.getTasksByUser(userId, filters);

      res.status(200).json({
        success: true,
        message: "Tasks retrieved successfully",
        data: {
          tasks,
        },
      });
    } catch (error: any) {
      if (error.message === "No tasks found") {
        return res.status(404).json({
          success: false,
          message: "No tasks found",
        });
      } else if (error.message === "Internal server error") {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      } else {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }
  };

  // Get task by id
  getTaskById = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const _id = req.params.id;

    try {
      const task = await this.taskService.getTaskById(_id, userId);

      res.status(200).json({
        success: true,
        message: "Task retrieved successfully",
        data: {
          task,
        },
      });
    } catch (error: any) {
      if (error.message === "Task not found") {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      } else if (error.message === "Internal server error") {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      } else {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }
  };

  // Edit a task
  editTask = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const taskData = req.body;
    const _id = req.params.id;

    try {
      const editedTask = await this.taskService.editTask(userId, _id, taskData);

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: {
          task: editedTask,
        },
      });
    } catch (error: any) {
      if (error.message === "Task not found") {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      } else if (error.message === "Internal server error") {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      } else {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }
  };

  // Delete a task
  deleteTask = async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const _id = req.params.id;

    try {
      const deletedTask = await this.taskService.deleteTask(_id, userId);

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: {
          task: deletedTask,
        },
      });
    } catch (error: any) {
      if (error.message === "Task not found") {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      } else if (error.message === "Internal server error") {
        return res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }
  };
}
