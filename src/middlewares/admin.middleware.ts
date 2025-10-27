import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user.repository";

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Assuming req.userId is set by your auth middleware
    const userId = req.userId as string;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const userRepo = new UserRepository();
    const user = await userRepo.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      // User is admin, allow access
      return next();
    } else {
      // User is not admin, deny access
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};