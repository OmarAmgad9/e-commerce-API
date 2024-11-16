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
exports.deleteCategoryValidator = exports.updateCategoryValidator = exports.getCategoryValidator = exports.createCategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const categoriesModel_1 = __importDefault(require("../../models/categoriesModel"));
exports.createCategoryValidator = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Should Enter Name For Category')
        .isLength({ min: 2, max: 50 }).withMessage('Length Of Name Should be between 2 and 50 character')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoriesModel_1.default.findOne({ name: value });
        if (category) {
            throw new Error('Category is already exist');
        }
        return true;
    })),
    validatorMiddleware_1.default
];
exports.getCategoryValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('This Id Not Valid'),
    validatorMiddleware_1.default
];
exports.updateCategoryValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('This Id Not Valid'),
    (0, express_validator_1.check)('name').optional().isLength({ min: 2, max: 50 }).withMessage('Length should be between 2 and 50 character'),
    validatorMiddleware_1.default
];
exports.deleteCategoryValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('This Id Not Valid'),
    validatorMiddleware_1.default
];
