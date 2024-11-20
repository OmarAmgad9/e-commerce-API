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
exports.resetCode = exports.VerifyResetCode = exports.forgetPassword = exports.allowedTo = exports.checkActiveUser = exports.protectRoutes = exports.login = exports.signUp = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken_1 = require("../utils/createToken");
const sendMail_1 = __importDefault(require("../utils/sendMail"));
// signup
exports.signUp = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersModel_1.default.create(req.body);
    const token = (0, createToken_1.createToken)(user._id, user.role);
    res.status(201).json({
        token: token,
        data: user
    });
}));
// login
exports.login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usersModel_1.default.findOne({ email: req.body.email });
    if (!user || !(yield bcryptjs_1.default.compare(req.body.password, user.password))) {
        return next(new apiError_1.default('Invalid Email Or Password', 401));
    }
    ;
    const token = (0, createToken_1.createToken)(user._id, user.role);
    res.status(200).json({
        token: token,
        data: user
    });
}));
// Protect Route
exports.protectRoutes = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1- get token
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else {
        return next(new apiError_1.default('Please Login First', 401));
    }
    // 2- decoded token
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    //3- check if user still exists in db
    const user = yield usersModel_1.default.findById(decodedToken._id);
    if (!user) {
        return next(new apiError_1.default('user not found', 404));
    }
    if (user.passwordChangedAt instanceof Date) {
        const changeTime = parseInt((user.passwordChangedAt.getTime() / 1000).toString());
        if (changeTime > decodedToken.iat) {
            return next(new apiError_1.default('please login again', 401));
        }
    }
    // 4- check change password
    req.user = user;
    next();
}));
// check Active 
exports.checkActiveUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.active)) {
        return next(new apiError_1.default('This User Not Active', 403));
    }
    next();
}));
// Allowed To 
const allowedTo = (...roles) => (0, express_async_handler_1.default)((req, res, next) => {
    var _a;
    if (!roles.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.role)) {
        return next(new apiError_1.default('Not Allowed to you', 403));
    }
    next();
});
exports.allowedTo = allowedTo;
//Forget Password
exports.forgetPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // email => restCode If code True ChangePassword another error
    const user = yield usersModel_1.default.findOne({ email: req.body.email });
    if (!user) {
        return next(new apiError_1.default('This User Not Found Signup', 404));
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000);
    user.restCode = resetCode.toString();
    user.restCodeExpireTime = Date.now() + (5 * 60 * 1000);
    user.restCodeVerify = false;
    const message = `Reset Code is ${resetCode}`;
    try {
        yield (0, sendMail_1.default)({ email: user.email, subject: 'Reset Password', message });
        yield user.save({ validateModifiedOnly: true });
    }
    catch (err) {
        console.log(err);
        return next(new apiError_1.default('error sending email', 400));
    }
    const resetToken = (0, createToken_1.createRestToken)(user._id);
    res.status(200).json({ message: 'reset password code sent to your email', resetToken });
}));
// Verify Reset Code
exports.VerifyResetCode = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else {
        return next(new apiError_1.default('Not authorization', 401));
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    const user = yield usersModel_1.default.findById(decoded._id);
    if (Date.parse(user === null || user === void 0 ? void 0 : user.restCodeExpireTime) < Date.now()) {
        return next(new apiError_1.default('Reset Code Expire', 400));
    }
    if (user.restCode === req.body.restCode) {
        user.restCodeVerify = true;
    }
    yield user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: 'reset code verified' });
}));
exports.resetCode = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else {
        return next(new apiError_1.default('Not authorization', 401));
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    const user = yield usersModel_1.default.findById(decoded._id);
    if (!user) {
        return next(new apiError_1.default('User Not Found', 404));
    }
    if (!user.restCodeVerify == true) {
        return next(new apiError_1.default('Reset Code Already Verified', 400));
    }
    user.password = req.body.password,
        user.restCode = undefined,
        user.restCodeVerify = false,
        user.restCodeExpireTime = undefined;
    user.passwordChangedAt = Date.now();
    yield user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: 'password Changed successfully' });
}));
