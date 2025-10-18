import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { config } from "../config/env";
import { LoginInput, RegisterInput } from "../schemas/auth.schema";
import { ResponseBody } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { ERRORS } from "../config/env";
import { sendByEmailJs } from "../services/email.service";
import {
  generate2FACode,
  get2FAExpirationTime,
} from "../services/twoFactor.service";
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
  }
}

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response<ResponseBody>
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        error: ERRORS.INVALID_CREDENTIALS,
      });
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingMinutes = Math.ceil(
        (user.lockUntil.getTime() - new Date().getTime()) / (1000 * 60)
      );
      return res.status(423).json({
        success: false,
        message: `Account is locked. Try again in ${remainingMinutes} minutes`,
        error: ERRORS.ACCOUNT_LOCKED,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const loginAttempts = (user.loginAttempts || 0) + 1;
      const updateData = {
        loginAttempts,
        updateAt: new Date(),
        lockUntil: user.lockUntil,
      };
      if (loginAttempts >= 3) {
        updateData.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        updateData.loginAttempts = 0;
      }

      await User.updateOne({ _id: user._id }, { $set: updateData });

      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        error: ERRORS.INVALID_CREDENTIALS,
      });
    }

    const twoFactorCode = generate2FACode();
    const twoFactorExpires = get2FAExpirationTime(15);

    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          twoFactorCode,
          twoFactorExpires,
          loginAttempts: 0,
          lockUntil: null,
          updatedAt: new Date(),
        },
      }
    );

    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role || "user", // Default to 'user' if type is undefined
    };

    try {
      const templateID = config.emailJsLoginTemplateId;
      const dataToSend = {
        user_name: userResponse.name,
        code: twoFactorCode,
      };
      await sendByEmailJs(user.email, dataToSend, templateID);
    } catch (error) {
      console.error("Failed to send 2FA email:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to send 2FA code",
        error: ERRORS.EMAIL_SEND_ERROR,
      });
    }

    res.status(200).json({
      success: true,
      message: "2FA code sent to your email",
      data: {
        email: userResponse.email,
        codeExpires: 15,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "login failed", error: ERRORS.INTERNAL_ERROR });
  }
};
