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
exports.deleteAddress = exports.addAddress = exports.getUserAddress = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
exports.getUserAddress = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield usersModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    res.status(200).json({ length: user === null || user === void 0 ? void 0 : user.address.length, data: user === null || user === void 0 ? void 0 : user.address });
}));
exports.addAddress = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield usersModel_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, { $addToSet: { address: req.body.address } }, { new: true });
    res.status(200).json({ length: user === null || user === void 0 ? void 0 : user.address.length, data: user === null || user === void 0 ? void 0 : user.address });
}));
exports.deleteAddress = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield usersModel_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, { $pull: { address: { _id: req.params.addressId } } }, { new: true });
    res.status(204).json();
}));