import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/User.entity";
import { AppDataSource } from "../config/database";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Authentication required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.userId } });

    if (!user) {
      throw new Error("User not found");
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
