import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const user = await AuthService.register(firstName, lastName, email, password);
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },
};
