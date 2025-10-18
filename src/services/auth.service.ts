import { UserInformation } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config, ERRORS } from "../config/env";
import { sendByEmailJs } from "./email.service";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(userData: UserInformation) {
    const { email, name, password } = userData;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      return {
        status: 400,
        message: "User already exists",
        error: ERRORS.USER_ALREADY_EXISTS,
      };
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
}
