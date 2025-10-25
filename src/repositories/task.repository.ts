import { ObjectId } from "mongoose";
import { Task, TaskInterface } from "../models/task.model";
import { User } from "../models/user.model";
import { TaskInput } from "../types/task.types";
import { TaskId } from "../schemas/task.schema";

export class TaskRepository {

    // Create a task
    async createTask(taskData: TaskInput & { userId: string | ObjectId }): Promise<TaskInterface> {
        return await Task.create(taskData);
    }
    
    // Edit a task
    async editTask(taskId: string, taskData: Partial<TaskInput>): Promise<TaskInterface | null> {
        return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
    }
    
    // Delete a task
    async deleteTask(taskId: string): Promise<TaskInterface | null> {
        return await Task.findOneAndDelete({ _id: taskId });
    }
    
    // Get tasks by user
    async getTasksByUser(userId: string): Promise<TaskInterface[]> {
        return await Task.find({ userId });
    }

    // Get task by id
    async getTaskById(taskId: string, userId: string): Promise<TaskInterface | null> {
        return await Task.findOne({ _id: taskId, userId });
    }
    
    // Get tasks by due date
    
    // Get tasks by priority
    
    // Get tasks by subject
}