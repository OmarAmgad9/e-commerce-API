"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const userValidator_1 = require("../utils/validator/userValidator");
const auth_1 = require("../controllers/auth");
const UsersRoute = (0, express_1.Router)();
UsersRoute.route('/')
    .get(users_1.getAllUsers)
    .post(users_1.uploadUserImage, users_1.resizeUserImage, userValidator_1.createUserValidator, users_1.createUser);
UsersRoute.route('/:id')
    .get(userValidator_1.getUserValidator, users_1.getUser)
    .put(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager'), users_1.uploadUserImage, users_1.resizeUserImage, userValidator_1.updateUserValidator, users_1.updateUser)
    .delete(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager'), userValidator_1.deleteUserValidator, users_1.deleteUser);
UsersRoute.put('/:id/changePassword', users_1.changeUserPassword);
exports.default = UsersRoute;
