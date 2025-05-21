"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
const User_entity_1 = require("../entities/User.entity");
const database_1 = require("../database");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const userRepository = database_1.AppDataSource.getRepository(User_entity_1.User);
exports.AuthService = {
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield userRepository.findOne({ where: { email } });
            if (existingUser) {
                throw new Error("Email already in use");
            }
            const hashedPassword = yield bcrypt.hash(password, 10);
            const user = userRepository.create({ email, password: hashedPassword });
            return yield userRepository.save(user);
        });
    },
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOne({ where: { email } });
            if (!user) {
                throw new Error("Invalid credentials");
            }
            const isValid = yield bcrypt.compare(password, user.password);
            if (!isValid) {
                throw new Error("Invalid credentials");
            }
            return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, // Ensure JWT_SECRET is a string
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1h", // Default to "1h" if undefined
            });
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository.findOne({ where: { id } });
        });
    },
};
