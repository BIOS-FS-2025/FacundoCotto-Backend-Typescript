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