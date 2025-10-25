
import {
  Payload,
  TwoFAInformation,
  UserInformation,
} from "../types/user.types";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";

import { config } from "../config/env";
import { sendByEmailJs } from "./email.service";
import { User, UserInterface } from "../models/user.model";
import { generate2FACode, get2FAExpirationTime, verify2FACode } from "./twoFactor.service";
import { generateAccessToken, generateRefreshToken } from "./jwt.service";

export class AuthService {
  constructor(
    private userRepository: UserRepository,

  ) {}

  async register(userData: UserInformation) {
    const { email, name, password } = userData;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createUser({
      email,
      name,
      password: hashedPassword,
    });

    this._emailjsWelocmeEmail(newUser.email, newUser.name);

    return {
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
        role: newUser.role || "user", // Default to 'user' if role is undefined
      },
    };
  }

  async login(userData: UserInformation) {
    const { email, password } = userData;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User already exists");
    }

    this._isAccountLocked(user);

    // console.log(this._isAccountLocked(user));

    const isPasswordValid = await this._comparePassword(
      password,
      user.password
    );

    // console.log("Is password valid: ", isPasswordValid);

    await this._loginAttempts(user, isPasswordValid);

    // console.log("Login attempts reset or successful login.", await this._loginAttempts(user, isPasswordValid));

    const { twoFactorCode, twoFactorExpires } = await this._generate2FACode(user);

    // console.log("Console log of user twoFactor: ", twoFactorCode, twoFactorExpires);


    this._emailjs2FACodeEmail(
      user.email,
      user.name,
      twoFactorCode
    );

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role || "user", // Default to 'user' if role is undefined
        FAcode: twoFactorCode,
        FAexpires: twoFactorExpires,
      },
      message: "2FA code sent to email",
    };
  }

  async verify2FA(userData: TwoFAInformation) {
    const { email, code } = userData;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.twoFactorCode || !user.twoFactorExpires) {
      throw new Error("2FA not enabled");
    }

    const validation = verify2FACode(code, user.twoFactorCode, user.twoFactorExpires);

    if(!validation.isValid){
      throw new Error(validation.message);
    }

    await this.userRepository.updateUser(user.email, {
      isVerified: true,
      updatedAt: new Date(),
    }, {
      twoFactorCode: "",
      twoFactorExpires: new Date(0),
    });

    const tokenPayload: Payload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        isVerified: true,
        createdAt: user.createdAt,
      },
      refreshToken,
      accessToken,
    };
  }

  private async _emailjsWelocmeEmail(email: string, name: string) {
    try {
      // await sendWelcomeEmail(email, userResponse.name);
      const templateID = config.emailJsWelcomeTemplateId;
      const dataToSend = {
        user_name: name,
      };
      await sendByEmailJs(email, dataToSend, templateID);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }
  }

  private async _emailjs2FACodeEmail(
    email: string,
    name: string,
    twoFactorCode: string
  ) {
    try {
      // await sendWelcomeEmail(email, userResponse.name);
      const templateID = config.emailJsLoginTemplateId;
      const dataToSend = {
        user_name: name,
        code: twoFactorCode,
      };
      await sendByEmailJs(email, dataToSend, templateID);
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
    }
  }

  private _isAccountLocked(user: UserInterface) {
    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingMinutes = Math.ceil(
        (user.lockUntil.getTime() - new Date().getTime()) / (1000 * 60)
      );
      throw new Error(
        `Account is locked. Try again in ${remainingMinutes} minutes`
      );
    }else {
      return `Account is not locked.`;
    }
  }

  private async _comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async _loginAttempts(user: UserInterface, isPasswordValid: boolean) {
    if (isPasswordValid === false) {
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
      await this.userRepository.updateUser(user.email, updateData);

      // console.log("Console log of User", User);
      throw new Error("Invalid credentials");
    } else {
      return `Login successful for user: ${user.email}`;
    }
  }

  private async _generate2FACode(user: UserInterface) {
    {
      const twoFactorCode = generate2FACode();
      const twoFactorExpires = get2FAExpirationTime(15);

      // console.log("Console log of twoFactorCode: ", twoFactorCode);
      // console.log("Console log of twoFactorExpires: ", twoFactorExpires);

      await this.userRepository.updateUser(user.email, {
        twoFactorCode: twoFactorCode,
        twoFactorExpires: twoFactorExpires,
        loginAttempts: 0,
        lockUntil: null,
        updatedAt: new Date(),
      });
      return { twoFactorCode, twoFactorExpires };
    }

  }


}
