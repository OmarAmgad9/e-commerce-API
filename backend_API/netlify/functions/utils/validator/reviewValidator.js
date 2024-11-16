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
exports.deleteReviewValidator = exports.updateReviewValidator = exports.getReviewValidator = exports.CreateReviewValidator = void 0;
const express_validator_1 = require("express-validator");
const reviewModel_1 = __importDefault(require("../../models/reviewModel"));
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
exports.CreateReviewValidator = [
    (0, express_validator_1.check)('comment').notEmpty().withMessage('Comment is Required')
        .isLength({ min: 2, max: 500 }).withMessage('Length of comment Invalid'),
    (0, express_validator_1.check)('rating').notEmpty().withMessage('Rating is Required')
        .isFloat({ min: 1, max: 5 }).withMessage('invalid rate'),
    (0, express_validator_1.check)('product').notEmpty().withMessage('Product is Required')
        .isMongoId().withMessage('Invalid product Id'),
    (0, express_validator_1.check)('user').notEmpty().withMessage('user is Required')
        .isMongoId().withMessage('Invalid user Id')
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const review = yield reviewModel_1.default.findOne({ user: val });
        if (review) {
            throw new Error('you Created review Before');
        }
        ;
        return true;
    })),
    validatorMiddleware_1.default
];
exports.getReviewValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid mongo id'),
    validatorMiddleware_1.default
];
exports.updateReviewValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid mongo id')
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        const review = yield reviewModel_1.default.findById(val);
        if ((review === null || review === void 0 ? void 0 : review.user._id.toString()) !== req.user._id.toString()) {
            throw new Error('you can only update your review');
        }
        return true;
    })),
    (0, express_validator_1.check)('comment')
        .optional().isLength({ min: 10, max: 500 }).withMessage('invalid comment length'),
    (0, express_validator_1.check)('rating')
        .optional().isFloat({ min: 1, max: 5 }).withMessage('invalid rate'),
    validatorMiddleware_1.default
];
exports.deleteReviewValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid mongo id')
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        if (req.user.role === 'user') {
            const review = yield reviewModel_1.default.findById(val);
            if ((review === null || review === void 0 ? void 0 : review.user._id.toString()) !== req.user._id.toString()) {
                throw new Error('you can only update your review');
            }
        }
        return true;
    })),
    validatorMiddleware_1.default
];
