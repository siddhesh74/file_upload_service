"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const multer_1 = require("./config/multer");
const auth_controller_1 = require("./controllers/auth.controller");
const file_controller_1 = require("./controllers/file.controller");
const auth_middleware_1 = require("./middleware/auth.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const createApp = () => {
    const app = (0, express_1.default)();
    // Middleware
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)("combined"));
    // Auth Routes
    app.post("/auth/register", auth_controller_1.AuthController.register);
    app.post("/auth/login", auth_controller_1.AuthController.login);
    // File Routes (protected)
    app.post("/files/upload", auth_middleware_1.authMiddleware, multer_1.upload.single("file"), file_controller_1.FileController.uploadFile);
    app.get("/files", auth_middleware_1.authMiddleware, file_controller_1.FileController.listFiles);
    app.get("/files/:id", auth_middleware_1.authMiddleware, file_controller_1.FileController.getFile);
    app.get("/files/:id/download", auth_middleware_1.authMiddleware, file_controller_1.FileController.downloadFile);
    // Error handling
    app.use(error_middleware_1.errorMiddleware);
    return app;
};
exports.createApp = createApp;
