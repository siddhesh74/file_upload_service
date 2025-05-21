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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
exports.TaskController = {
    getTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const task = yield task_service_1.TaskService.getTaskById(id, userId);
                if (!task) {
                    return res.status(404).json({ error: "Task not found" });
                }
                res.json(task);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    },
    listTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const tasks = yield task_service_1.TaskService.getUserTasks(userId);
                res.json(tasks);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    },
};
