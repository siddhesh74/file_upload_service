import Bull from "bull";

const taskQueue = new Bull("task-queue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

export const QueueService = {
  async addTaskToQueue(task: any): Promise<void> {
    await taskQueue.add({ taskId: task.id });
  },
};
