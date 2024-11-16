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
exports.changeUserPassword = exports.updateUser = exports.deleteUser = exports.createUser = exports.getUser = exports.getAllUsers = exports.resizeUserImage = exports.uploadUserImage = void 0;
const refactorHandling_1 = require("./refactorHandling");
const usersModel_1 = __importDefault(require("../models/usersModel"));
const uploadImage_1 = require("../middlewares/uploadImage");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const sharp_1 = __importDefault(require("sharp"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.uploadUserImage = (0, uploadImage_1.uploadSingleImage)('image');
exports.resizeUserImage = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const imgName = `user-${Date.now()}.webp`;
        yield (0, sharp_1.default)(req.file.buffer)
            .toFormat('webp')
            .webp({ quality: 95 })
            .toFile(`uploads/users/${imgName}`);
        req.body.image = imgName;
    }
    next();
}));
exports.getAllUsers = (0, refactorHandling_1.getAll)(usersModel_1.default, 'users');
exports.getUser = (0, refactorHandling_1.getOne)(usersModel_1.default);
exports.createUser = (0, refactorHandling_1.createDoc)(usersModel_1.default);
exports.deleteUser = (0, refactorHandling_1.deleteOne)(usersModel_1.default);
exports.updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersModel_1.default.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        image: req.body.image,
        active: req.body.active
    }, { new: true });
    res.status(200).json({ data: user });
}));
exports.changeUserPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersModel_1.default.findByIdAndUpdate(req.params.id, {
        password: bcryptjs_1.default.hash(req.body.password, 15),
        passwordChangedAt: Date.now()
    }, { new: true });
}));
