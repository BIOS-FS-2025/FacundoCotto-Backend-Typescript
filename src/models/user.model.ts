import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface UserInterface extends Document {
  _id: string | ObjectId;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  twoFactorCode: string | null;
  twoFactorExpires: Date | null;
  loginAttempts: number;
  lockUntil: Date | null;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserInterface>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    twoFactorCode: { type: String, default: null },
    twoFactorExpires: { type: Date, default: null },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    role: { type: String, enum: ["admin", "user"], default: "user" }, // Default value set to "user"
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }
);

export const User = mongoose.model<UserInterface>("User", userSchema);