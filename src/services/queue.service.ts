import Bull from "bull";
import { Task } from "../entities/Task.entity";
import { TaskService } from "./task.service";
import { FileService } from "./file.service";

const taskQueue = new Bull("task-queue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

// Process jobs in the queue
taskQueue.process(async (job) => {
  const { taskId } = job.data;

  // Update task status to processing
  await TaskService.updateTaskStatus(taskId, "processed");

  try {
    // Simulate processing (replace with actual processing logic)
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Update task status to completed
    await TaskService.updateTaskStatus(taskId, "processed", {
      message: "File processed successfully",
    });

    // Update related file status
    // You might want to associate files with tasks in your logic
  } catch (error: any) {
    await TaskService.updateTaskStatus(taskId, "failed", {
      error: error.message,
    });
    throw error;
  }
});

export const QueueService = {
  async addTaskToQueue(task: Task): Promise<void> {
    await taskQueue.add({ taskId: task.id });
  },
};
