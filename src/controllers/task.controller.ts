import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export const TaskController = {
  async getTask(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const task = await TaskService.getTaskById(id, userId);

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      res.json(task);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async listTasks(req: Request, res: Response): Promise<any> {
    try {
      const userId = (req as any).user.id;
      const tasks = await TaskService.getUserTasks(userId);
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
