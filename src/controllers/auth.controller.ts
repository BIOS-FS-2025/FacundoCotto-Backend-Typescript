import { Request, Response } from "express";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { ResponseBody } from "../interfaces/user.interface";
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

      const { user, token } = result;

      res
        .status(201)
        .json({ message: "User registered successfully", data: user, token });
    } catch (error) {
      res.status(500).json({ message: "register failed" });
    }
  };

  login = async (
    req: Request<{}, {}, LoginInput>,
    res: Response<ResponseBody>
  ) => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login({ email, password });

      console.log("console log of result: ", result)


      res.status(201).json({ message: "Login success and 2FA code sent to your email",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed. Pls check your credentials and try again." });
    }
  };
}
