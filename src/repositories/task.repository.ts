import { ObjectId } from "mongoose";
import { Task, TaskInterface } from "../models/task.model";
import { TaskFilter, TaskInput } from "../types/task.types";

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
    async getTasksByUser(userId: string, filters: TaskFilter): Promise<TaskInterface[]> {

        const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
      search = "",
      dueDate,
      priority,
      subject,
      completed,
    } = filters;

    const query: any = { userId };

    if (typeof completed === "boolean") query.completed = completed;
    if (typeof completed === "string" || completed) {
      if(completed.toString().toLowerCase() === "true") query.completed = true;
      if(completed.toString().toLowerCase() === "false") query.completed = false;
    }


    if (priority && priority.length > 0) query.priority = { $in: priority };
    if (subject && subject.length > 0) query.subject = { $in: subject };
    if (dueDate) query.dueDate = dueDate;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions: { [key: string]: 1 | -1 } = {};
    sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    return await Task.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    }

    // Get task by id
    async getTaskById(taskId: string, userId: string): Promise<TaskInterface | null> {
        return await Task.findOne({ _id: taskId, userId });
        
    }
    
    async getTaskByTitleAndUser(title: string, userId: string): Promise<TaskInterface | null> {
        return await Task.findOne({ title, userId });
      }
}