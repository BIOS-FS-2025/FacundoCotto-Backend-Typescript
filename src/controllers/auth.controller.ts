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
    } catch (error) {
      res.status(500).json({ message: "register failed, user already exists" });
    }
  };

  login = async (
    req: Request<{}, {}, LoginInput>,
    res: Response<ResponseBody>
  ) => {
    try {
      const { email, password } = req.body;

      // console.log("Login attempt for email: ", email);
      // console.log("Login attempt with password: ", password);

      const result = await this.authService.login({ email, password });

      // console.log("console log of result: ", result);

      res
        .status(201)
        .json({
          message: "Login success and 2FA code sent to your email",
          data: result,
        });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Login failed. Please check your credentials and try again.",
        });
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
        res.status(200).json({ message: "2FA verification successful", refreshToken, accessToken });
      } else {
        res.status(400).json({ message: "Invalid 2FA code" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "2FA verification failed. Please try again." });
      console.error("2FA verification error: ", error);
    }
  };
}
