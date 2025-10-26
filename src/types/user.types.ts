import { Request } from "express";
import { UserInterface } from "../models/user.model";

export interface ResponseBody {
  message: string;
  error?: string;
  data?: any;
  token?: string;
  success?: boolean;
  refreshToken?: string;
  accessToken?: string;
}

export interface RequestWithUserId extends Request {
  userId?: string;
}

export interface UserInformation {
  email: string;
  name?: string; // Made name optional for login
  password: string;
}

export interface TwoFAInformation {
  email: string;
  code: string;
}

export interface Payload {
  userId: string;
  email: string;
  name: string;
}

export interface Projection {
  password: 0 | 1;
  twoFactorCode: 0 | 1;
  twoFactorExpires: 0 | 1;
}

// Extend Express Request to include user and userId
declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
      userId?: string;
    }
  }
}
