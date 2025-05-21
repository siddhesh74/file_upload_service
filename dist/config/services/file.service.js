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
exports.FileService = void 0;
const database_1 = require("../database");
const File_entity_1 = require("../entities/File.entity");
const User_entity_1 = require("../entities/User.entity");
const task_service_1 = require("./task.service");
const fileRepository = database_1.AppDataSource.getRepository(File_entity_1.File);
exports.FileService = {
    createFile(fileData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.AppDataSource.getRepository(User_entity_1.User).findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new Error("User not found");
            }
            const file = fileRepository.create(Object.assign(Object.assign({}, fileData), { user }));
            const savedFile = yield fileRepository.save(file);
            // Create a background task
            yield task_service_1.TaskService.createTask({
                type: "file_processing",
                status: "uploaded",
                user,
            });
            return savedFile;
        });
    },
    getFileById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fileRepository.findOne({
                where: { id, user: { id: userId } },
                relations: ["user"],
            });
        });
    },
    getUserFiles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fileRepository.find({
                where: { user: { id: userId } },
                relations: ["user"],
            });
        });
    },
    updateFileStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield fileRepository.findOne({ where: { id } });
            if (!file) {
                return null;
            }
            file.status = status;
            return yield fileRepository.save(file);
        });
    },
};
