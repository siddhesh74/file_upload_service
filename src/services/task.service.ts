import { AppDataSource } from "../config/database";
import { Task } from "../entities/Task.entity";
import { User } from "../entities/User.entity";
import { QueueService } from "./queue.service";

const taskRepository = AppDataSource.getRepository(Task);

export const TaskService = {
  async createTask(taskData: Partial<Task> & { user: User }): Promise<Task> {
    const task = taskRepository.create(taskData);
    const savedTask = await taskRepository.save(task);

    // Add to processing queue
    await QueueService.addTaskToQueue(savedTask);

    return savedTask;
  },

  async getTaskById(id: string, userId: string): Promise<Task | null> {
    return await taskRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ["user"],
    });
  },

  async getUserTasks(userId: string): Promise<Task[]> {
    return await taskRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
  },

  async updateTaskStatus(
    id: string,
    status: "uploaded" | "processing" | "processed" | "failed",
    result?: any
  ): Promise<Task | null> {
    const task = await taskRepository.findOne({ where: { id } });
    if (!task) {
      return null;
    }

    task.status = status;
    if (result) {
      task.result = result;
    }
    if (status === "processed" || status === "failed") {
      task.completedAt = new Date();
    }

    return await taskRepository.save(task);
  },
};
