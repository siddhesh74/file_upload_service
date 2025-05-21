import { Request, Response } from "express";
import { FileService } from "../services/file.service";
import path from "path";

export const FileController = {
  async uploadFile(req: Request, res: Response): Promise<any> {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const userId = (req as any).user.id;
      // Get optional metadata from form-data
      const { title, description } = req.body;

      const fileData = {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        mimeType: req.file.mimetype,
        title, // add title
        description, // add description
      };

      const file = await FileService.createFile(fileData, userId);
      res.status(201).json(file);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getFile(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const file = await FileService.getFileById(id, userId);

      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      res.json(file);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async listFiles(req: Request, res: Response): Promise<any> {
    try {
      const userId = (req as any).user.id;
      const files = await FileService.getUserFiles(userId);
      res.json(files);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async downloadFile(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const file = await FileService.getFileById(id, userId);

      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      res.download(file.path, file.originalName);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
