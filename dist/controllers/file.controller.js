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
exports.FileController = void 0;
const file_service_1 = require("../services/file.service");
exports.FileController = {
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    return res.status(400).json({ error: "No file uploaded" });
                }
                const userId = req.user.id;
                const fileData = {
                    originalName: req.file.originalname,
                    storedName: req.file.filename,
                    path: req.file.path,
                    size: req.file.size,
                    mimeType: req.file.mimetype,
                };
                const file = yield file_service_1.FileService.createFile(fileData, userId);
                res.status(201).json(file);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    },
    getFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const file = yield file_service_1.FileService.getFileById(id, userId);
                if (!file) {
                    return res.status(404).json({ error: "File not found" });
                }
                res.json(file);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    },
    listFiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.user.id;
                const files = yield file_service_1.FileService.getUserFiles(userId);
                res.json(files);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    },
    downloadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.user.id;
                const file = yield file_service_1.FileService.getFileById(id, userId);
                if (!file) {
                    return res.status(404).json({ error: "File not found" });
                }
                res.download(file.path, file.originalName);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    },
};
