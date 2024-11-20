"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = () => {
    mongoose_1.default.connect(process.env.DB)
        .then(() => {
        console.log(`MonogeDB Connected to ${process.env.DB}`);
    }).catch((error) => {
        console.log(`Can not Connected DataBase\n error: ${error}`);
    });
};
exports.default = dbConnection;
