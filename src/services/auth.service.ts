import { UserInformation } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { sendByEmailJs } from "./email.service";
import { User, UserInterface } from "../models/user.model";
import { generate2FACode, get2FAExpirationTime } from "./twoFactor.service";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

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

    const token = this._generateToken(newUser._id.toString());

    this._emailjsWelocmeEmail(newUser.email, newUser.name);

    return {
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
        role: newUser.role || "user", // Default to 'user' if role is undefined
      },
      token,
    };
  }

  async login(userData: UserInformation) {
    const { email, password } = userData;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User already exists");
    }

    this._isAccountLocked(user);

    console.log("Account is not locked, proceeding with login", this._isAccountLocked(user));

    const isPasswordValid = await this._comparePassword(password, user.password);

    await this._loginAttempts(user, isPasswordValid);

    await this._generate2FACode(user);
  

    const updatedUser = await this.userRepository.findByEmail(email);

    console.log(updatedUser!.twoFactorCode);

    this._emailjs2FACodeEmail(user.email, user.name, updatedUser!.twoFactorCode!);

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role || "user", // Default to 'user' if role is undefined
        FAcode: updatedUser!.twoFactorCode!,
      },
      message: "2FA code sent to email",
    };
  }

  private _generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "24h" });
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
      throw new Error(`Account is locked. Try again in ${remainingMinutes} minutes`);
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
      await User.updateOne({ _id: user._id }, { $set: updateData });

      console.log("Console log of User", User);
      throw new Error("Invalid credentials");
    }
  }

  private async _generate2FACode(user: UserInterface) {
    {
      const twoFactorCode = generate2FACode();
      const twoFactorExpires = get2FAExpirationTime(15);

      console.log("Console log of twoFactorCode: ", twoFactorCode);
      console.log("Console log of twoFactorExpires: ", twoFactorExpires);

      await User.updateOne(
        { _id: user._id },
        {
          $set: {
            twoFactorCode: twoFactorCode ,
            twoFactorExpires: twoFactorExpires,
            loginAttempts: 0,
            lockUntil: null,
            updatedAt: new Date(),
          },
        }
      );

      return twoFactorCode;
    }
  }
}

