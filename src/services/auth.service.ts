import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { User } from "../entities/User.entity";
import { AppDataSource } from "../config/database";
import * as dotenv from "dotenv";
dotenv.config();

const userRepository = AppDataSource.getRepository(User);

export const AuthService = {
  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<User> {
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ email, password: hashedPassword, firstName, lastName });
    return await userRepository.save(user);
  },

  async login(email: string, password: string): Promise<string> {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return jwt.sign({ userId: user.id, user: email }, process.env.JWT_SECRET as any, {
      expiresIn: process.env.JWT_EXPIRES_IN || ("1h" as any),
    }) as string;
  },

  async getUserById(id: string): Promise<User | null> {
    return await userRepository.findOne({ where: { id } });
  },
};
