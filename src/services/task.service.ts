import { TaskInterface } from "../models/task.model";
import { TaskRepository } from "../repositories/task.repository";
import { TaskFilter, TaskInput } from "../types/task.types";

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  // Get tasks by id
  async getTaskById(
    taskId: string,
    userId: string
  ): Promise<TaskInterface | null> {
    const task = await this.taskRepository.getTaskById(taskId, userId);
    if (!task) { throw new Error("Task not found"); }

    // console.log(author)

    const { email, name } = task.author || {
      email: undefined,
      name: undefined,
    };

    // console.log(email, name);

    return {
      ...task,
      author: {
        name,
        email,
      },
    };
  }

  // Create a task
  async createTask(
    taskData: TaskInput,
    userId: string
  ): Promise<TaskInterface | null> {
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
  ): Promise<TaskInterface[] | []> {
    const tasks = await this.taskRepository.getTasksByUser(userId, filters);

    if (!tasks || tasks.length === 0) throw new Error("No tasks found");

    return tasks.map((post) => ({
      ...post,
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

    const deletedTask = await this.taskRepository.deleteTask(taskId);
    return deletedTask;
  }
}
