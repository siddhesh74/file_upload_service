import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { upload } from "./config/multer";
import { AuthController } from "./controllers/auth.controller";
import { FileController } from "./controllers/file.controller";
import { authMiddleware } from "./middleware/auth.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("combined"));

  // Auth Routes
  app.post("/auth/register", AuthController.register);
  app.post("/auth/login", AuthController.login);

  // File Routes (protected)
  app.post("/files/upload", authMiddleware, upload.single("file"), FileController.uploadFile);
  app.get("/files", authMiddleware, FileController.listFiles);
  app.get("/files/:id", authMiddleware, FileController.getFile);
  app.get("/files/:id/download", authMiddleware, FileController.downloadFile);

  // Error handling
  app.use(errorMiddleware);

  return app;
};
