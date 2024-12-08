"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authValidator_1 = require("../utils/validator/authValidator");
const authRoute = (0, express_1.Router)();
authRoute.post('/login', authValidator_1.loginValidator, auth_1.login);
authRoute.post('/signup', authValidator_1.singUpValidator, auth_1.signUp);
authRoute.post('/forgetPassword', auth_1.forgetPassword);
authRoute.post('/verify', auth_1.VerifyResetCode);
authRoute.post('/restCode', authValidator_1.restPasswordValidator, auth_1.resetCode);
exports.default = authRoute;
