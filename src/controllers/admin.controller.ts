import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

export class AdminController {
  constructor(private adminService: AdminService) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const { email, name, password } = req.body;

      const result = await this.adminService.createUser({
        email,
        name,
        password,
      });

      const user = result;

      res
        .status(201)
        .json({ message: "User created successfully", data: user });
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

  getAllUsers = async (req: Request, res: Response) => {
    const filters = req.query;

    try {
      const users = await this.adminService.getAllUsers(filters);

      res.status(200).json({
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error: any) {
      if (error.message === "No users found") {
        return res.status(404).json({ message: error.message });
      } else if (error.message === "Internal server error") {
        return res.status(500).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const updateData = req.body.updateData;
    const resetData = req.body.resetData;

    try {
      const updatedUser = await this.adminService.updateUser(
        userId,
        updateData,
        resetData
      );
      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ message: error.message });
      } else if (error.message === "Internal server error") {
        res.status(500).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
      const deletedUser = await this.adminService.deleteUser(userId);
      res.status(200).json({
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ message: error.message });
      } else if (error.message === "Internal server error") {
        res.status(500).json({ message: error.message });
      } else if (error.message === "Cannot delete admin users") {
        res.status(403).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message });
      }
    }
  };
}
