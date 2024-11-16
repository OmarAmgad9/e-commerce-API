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
exports.removeFromWishlistValidator = exports.addToWishlistValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const product_1 = __importDefault(require("../../models/product"));
exports.addToWishlistValidator = [
    (0, express_validator_1.check)('product').isMongoId().withMessage('invalid product id')
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield product_1.default.findById(val);
        if (!products) {
            throw new Error('Product Not Found');
        }
        ;
        return true;
    })),
    validatorMiddleware_1.default
];
exports.removeFromWishlistValidator = [
    (0, express_validator_1.check)('productId').isMongoId().withMessage('invalid product id'),
    validatorMiddleware_1.default
];
