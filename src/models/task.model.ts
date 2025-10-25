import mongoose, {ObjectId, Schema, model } from "mongoose";
import { Priority, Subject } from "../types/task.types";


export interface TaskInterface extends Document {
    _id: string | ObjectId;
    title: string;
    description: string;
    completed: boolean;
    userId: mongoose.Types.ObjectId;
    author: {
        name: string | undefined;
        email: string | undefined; 
    }
    dueDate: Date | null;
    priority: Priority[];
    subject: Subject[];
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<TaskInterface>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        completed: { type: Boolean, default: false },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        dueDate: { type: Date, default: null },
        priority: { type: [String], enum: Object.values(Priority), default: [Priority.MEDIUM] },
        subject: { type: [String], enum: Object.values(Subject), default: [Subject.GENERAL] },
    }
);

taskSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
})

export const Task = mongoose.model<TaskInterface>("Task", taskSchema);