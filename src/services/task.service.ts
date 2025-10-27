import { TaskInterface } from "../models/task.model";
import { TaskRepository } from "../repositories/task.repository";
import { TaskFilter, TaskInput, TaskResponse } from "../types/task.types";

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  // Get tasks by id
  async getTaskById(
    taskId: string,
    userId: string
  ): Promise<TaskResponse | null> {
    const task = await this.taskRepository.getTaskById(taskId, userId);
    if (!task) {
      throw new Error("Task not found");
    }

    return {
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      subject: task.subject,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  // Create a task
  async createTask(
    taskData: TaskInput,
    userId: string
  ): Promise<TaskResponse | null> {
    const newTask = await this.taskRepository.createTask({
      ...taskData,
      userId,
    });

    return await this.getTaskById(newTask._id.toString(), userId);
  }

  // Get tasks by user
  async getTasksByUser(
    userId: string,
    filters: TaskFilter
  ): Promise<TaskResponse[] | []> {
    const tasks = await this.taskRepository.getTasksByUser(userId, filters);

    if (!tasks || tasks.length === 0) throw new Error("No tasks found");

    return tasks.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      description: post.description,
      dueDate: post.dueDate,
      priority: post.priority,
      subject: post.subject,
      completed: post.completed,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }

  // Edit a task
  async editTask(
    userId: string,
    taskId: string,
    taskData: Partial<TaskInput>
  ): Promise<TaskInterface | null> {
    const getTask = await this.getTaskById(taskId, userId);
    if (!getTask) throw new Error("Task not found");

    getTask.updatedAt = new Date();

    return await this.taskRepository.editTask(taskId, taskData);
  }

  // Delete a task
  async deleteTask(
    taskId: string,
    userId: string
  ): Promise<TaskInterface | null> {
    const getTask = await this.getTaskById(taskId, userId);
    if (!getTask) throw new Error("Task not found");

    return await this.taskRepository.deleteTask(taskId);
  }
}
