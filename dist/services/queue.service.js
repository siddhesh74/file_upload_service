"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const bull_1 = __importDefault(require("bull"));
const task_service_1 = require("./task.service");
const taskQueue = new bull_1.default("task-queue", {
    redis: {
        host: "127.0.0.1",
        port: 6379,
    },
});
// Process jobs in the queue
taskQueue.process((job) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = job.data;
    // Update task status to processing
    yield task_service_1.TaskService.updateTaskStatus(taskId, "processed");
    try {
        // Simulate processing (replace with actual processing logic)
        yield new Promise((resolve) => setTimeout(resolve, 5000));
        // Update task status to completed
        yield task_service_1.TaskService.updateTaskStatus(taskId, "processed", {
            message: "File processed successfully",
        });
        // Update related file status
        // You might want to associate files with tasks in your logic
    }
    catch (error) {
        yield task_service_1.TaskService.updateTaskStatus(taskId, "failed", {
            error: error.message,
        });
        throw error;
    }
}));
exports.QueueService = {
    addTaskToQueue(task) {
        return __awaiter(this, void 0, void 0, function* () {
            yield taskQueue.add({ taskId: task.id });
        });
    },
};
