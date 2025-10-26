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
    if (!task) return null;

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
  async getTasksByUser(userId: string, filters: TaskFilter): Promise<TaskInterface[] | []> {

    const tasks = await this.taskRepository.getTasksByUser(userId, filters);

    if (!tasks || tasks.length === 0) return [];

    return tasks.map((post) => ({
      ...post,
    }));

}

  async editTask(
    userId: string,
    taskId: string,
    taskData: Partial<TaskInput>
  ): Promise<TaskInterface | null> {
    const getTask = await this.getTaskById(taskId, userId);
    if (!getTask) return null;

    getTask.updatedAt = new Date();

    return await this.taskRepository.editTask(taskId, taskData);
  }
  
  async deleteTask(
    taskId: string,
    userId: string
  ): Promise<TaskInterface | null> {
    const getTask = await this.getTaskById(taskId, userId);
    if (!getTask) return null;

    const deletedTask = await this.taskRepository.deleteTask(taskId);
    return deletedTask;
  }
}
