import { UserInterface } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";
import { UserFilter, UserInformation } from "../types/user.types";
import bcrypt from "bcryptjs";

export class AdminService {
    constructor(private userRepository: UserRepository) {}

    async createUser(userData: UserInformation) {

        const { email, name, password } = userData;

        const existingUser = await this.userRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.userRepository.createUser({
            email,
            name,
            password: hashedPassword
        });

        return {
            id: newUser._id.toString(),
            email: newUser.email,
            name: newUser.name,
            role: newUser.role || "user",
        };
    }

    async getAllUsers(filters: UserFilter): Promise<UserInterface[]> {

        const users = await this.userRepository.getAllUsers(filters);

        if (!users || users.length === 0) {
            throw new Error("No users found");
        }

        return users;
    }

    async updateUser(id: string, updateData?: Partial<UserInformation>, resetData?: Partial<UserInformation>): Promise<UserInterface | null> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        const updatedUser = await this.userRepository.updateUserById(id, updateData || {}, resetData || {});

        return updatedUser;
    }

    async deleteUser(id: string): Promise<UserInterface | null> {
        const user = await this.userRepository.findById(id);
        
        if (!user) {
            throw new Error("User not found");
        }

        if(user.role === "admin") {
            throw new Error("Cannot delete admin users");
        }
        
        return await this.userRepository.deleteUser(id);
    }
}