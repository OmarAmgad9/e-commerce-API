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
exports.changePasswordValidator = exports.deleteUserValidator = exports.updateUserValidator = exports.getUserValidator = exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const usersModel_1 = __importDefault(require("../../models/usersModel"));
const apiError_1 = __importDefault(require("../apiError"));
exports.createUserValidator = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Should Enter Name For Category')
        .isLength({ min: 2, max: 50 }).withMessage('Length Of Name Should be between 2 and 50 character'),
    (0, express_validator_1.check)('email').notEmpty().withMessage('Email is Required')
        .isEmail().withMessage('Invalid Email')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const emailUser = yield usersModel_1.default.findOne({ email: value });
        if (emailUser) {
            throw new apiError_1.default('Email  Already Exist', 400);
        }
        return true;
    })),
    (0, express_validator_1.check)('password').notEmpty().withMessage('Password Is Required')
        .isLength({ min: 8, max: 30 }).withMessage('password Length greater than 8 char')
        .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
            throw new apiError_1.default('password doesn\'t match', 400);
        }
        return true;
    }),
    (0, express_validator_1.check)('confirmPassword').notEmpty().withMessage('Password Is Required')
        .isLength({ min: 8, max: 30 }).withMessage('password Length greater than 8 char'),
    (0, express_validator_1.check)('phone').optional().isMobilePhone(['ar-EG']),
    validatorMiddleware_1.default
];
exports.getUserValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('This Id Not Valid'),
    validatorMiddleware_1.default
];
exports.updateUserValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('This Id Not Valid'),
    (0, express_validator_1.check)('name').optional().isLength({ min: 2, max: 50 }).withMessage('Length should be between 2 and 50 character'),
    (0, express_validator_1.check)('phone').optional().isMobilePhone(['ar-EG']).withMessage('invalid Egyptian number'),
    (0, express_validator_1.check)('active').optional().isBoolean().withMessage('active must be true or false'),
    validatorMiddleware_1.default
];
exports.deleteUserValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('This Id Not Valid'),
    validatorMiddleware_1.default
];
exports.changePasswordValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('This Id Not Valid'),
    (0, express_validator_1.check)('password').notEmpty().withMessage('password is Required')
        .isLength({ min: 8, max: 30 }).withMessage('password Length greater 8 char')
        .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
            throw new apiError_1.default('Password  doesn\'t match', 400);
        }
        return true;
    }),
    (0, express_validator_1.check)('confirmPassword').notEmpty().withMessage('password is Required')
        .isLength({ min: 8, max: 30 }).withMessage('password Length greater 8 char'),
    validatorMiddleware_1.default
];
