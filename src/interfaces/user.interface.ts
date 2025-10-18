import { Request } from "express";

export interface ResponseBody {
  message: string;
  error?: string;
  data?: any;
  token?: string;
  success?: boolean;  
}

export interface RequestWithUserId extends Request {
  userId?: string;
}

export interface UserInformation {
  email: string;
  name: string;
  password: string; 
}