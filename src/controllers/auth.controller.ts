import { Request, Response } from "express";
import {
  LoginInput,
  RegisterInput,
  Verify2FAInput,
} from "../schemas/auth.schema";
import { ResponseBody } from "../types/user.types";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (
    req: Request<{}, {}, RegisterInput>,
    res: Response<ResponseBody>
  ) => {
    try {
      const { email, name, password } = req.body;

      const result = await this.authService.register({ email, name, password });

      const { user } = result;

      res
        .status(201)
        .json({ message: "User registered successfully", data: user });
    } catch (error: any) {
      if (error.message === "User already exists") {
        res.status(409).json({ message: error.message });
      } else if (error.message === "Internal server error") {
        res.status(500).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  };

  login = async (
    req: Request<{}, {}, LoginInput>,
    res: Response<ResponseBody>
  ) => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login({ email, password });

      res.status(200).json({
        message: "Login success and 2FA code sent to your email",
        data: result,
      });
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(409).json({ message: error.message });
      } else if (
        error.message ===
        "Account is locked due to multiple failed login attempts. Please try again in 15 minutes."
      ) {
        res.status(423).json({ message: error.message });
      } else if (error.message === "Invalid credentials") {
        res.status(401).json({ message: error.message });
      } else if (error.message === "Internal server error") {
        res.status(500).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  };

  verify2FA = async (
    req: Request<{}, {}, Verify2FAInput>,
    res: Response<ResponseBody>
  ) => {
    try {
      const { email, code } = req.body;

      const result = await this.authService.verify2FA({ email, code });

      const { refreshToken, accessToken } = result;

      if (result) {
        res
          .status(200)
          .json({
            message: "2FA verification successful",
            refreshToken,
            accessToken,
          });
      } else {
        res.status(400).json({ message: "Invalid 2FA code" });
      }
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(409).json({ message: error.message });
      } else if (error.message === "Invalid or expired 2FA code") {
        res.status(401).json({ message: error.message });
      } else if (error.message === "Internal server error") {
        res.status(500).json({ message: error.message });
      } 
      else {
        res.status(400).json({ message: error.message });
      }
    }
  };
}
