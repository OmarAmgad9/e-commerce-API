"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRestToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (payload, role) => jsonwebtoken_1.default.sign({ _id: payload, role: role }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
exports.createToken = createToken;
const createRestToken = (payload) => jsonwebtoken_1.default.sign({ _id: payload }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });
exports.createRestToken = createRestToken;
