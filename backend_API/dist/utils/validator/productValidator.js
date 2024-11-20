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
exports.deleteProductValidator = exports.updateProductValidator = exports.getProductValidator = exports.createProductValidator = void 0;
const express_validator_1 = require("express-validator");
const categoriesModel_1 = __importDefault(require("../../models/categoriesModel"));
const subcategoryModel_1 = __importDefault(require("../../models/subcategoryModel"));
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
exports.createProductValidator = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Should be Enter name of Product')
        .isLength({ min: 2, max: 50 }).withMessage('Should be Length of Name Between 2 && 50 char'),
    (0, express_validator_1.check)('description').notEmpty().withMessage('Should be Enter description of Product')
        .isLength({ min: 2, max: 600 }).withMessage('Should be length of description between 2 && 600'),
    (0, express_validator_1.check)('quantity').optional().isNumeric().toInt(),
    (0, express_validator_1.check)('price').notEmpty().withMessage('Should be Enter Your Price').isFloat().withMessage('Should be a valid price')
        .custom((value) => {
        if (value < 0) {
            throw new Error("Price should be greater than zero");
        }
        return true;
    }),
    // check('priceAfterDiscount').isFloat().withMessage('Enter Value Price')
    // .custom((value: number, {req})=>{
    //     if(value < 0 || value > req.body.price){
    //         throw new Error('Invalid price Discount')
    //     }
    //     return true
    // }),
    (0, express_validator_1.check)('category').isMongoId().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const cat = yield categoriesModel_1.default.findById(value);
        if (!cat) {
            throw new Error("Category Not Found");
        }
        return true;
    })),
    (0, express_validator_1.check)('subcategory').isMongoId().custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const sub_cat = yield subcategoryModel_1.default.findById(value);
        if (!sub_cat) {
            throw new Error('SubCategory Not Found');
        }
        if (sub_cat.category.id.toString() != req.body.category) {
            throw new Error('Category Not Found');
        }
        return true;
    })),
    validatorMiddleware_1.default
];
exports.getProductValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid Id'),
    validatorMiddleware_1.default
];
exports.updateProductValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid Id'),
    (0, express_validator_1.check)('name').optional().notEmpty().withMessage('Should be Enter name of Product')
        .isLength({ min: 2, max: 50 }).withMessage('Should be Length of Name Between 2 && 50 char'),
    (0, express_validator_1.check)('description').optional().notEmpty().withMessage('Should be Enter description of Product')
        .isLength({ min: 2, max: 600 }).withMessage('Should be length of description between 2 && 600'),
    (0, express_validator_1.check)('quantity').optional().isNumeric().toInt(),
    (0, express_validator_1.check)('price').optional().notEmpty().withMessage('Should be Enter Your Price').isFloat().withMessage('Should be a valid price')
        .custom((value) => {
        if (value < 0) {
            throw new Error("Price should be greater than zero");
        }
        return true;
    }),
    (0, express_validator_1.check)('priceAfterDiscount').optional().isFloat().withMessage('Enter Value Price')
        .custom((value, { req }) => {
        if (value < 0 || value > req.body.price) {
            throw new Error('Invalid price Discount');
        }
        return true;
    }),
    (0, express_validator_1.check)('category').optional().isMongoId().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const cat = yield categoriesModel_1.default.findById(value);
        if (!cat) {
            throw new Error("Category Not Found");
        }
        return true;
    })),
    (0, express_validator_1.check)('subcategory').optional().isMongoId().custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const sub_cat = yield subcategoryModel_1.default.findById(value);
        if (!sub_cat) {
            throw new Error('SubCategory Not Found');
        }
        if (sub_cat.category.id.toString() != req.body.category) {
            throw new Error('Category Not Found');
        }
        return true;
    })),
    validatorMiddleware_1.default
];
exports.deleteProductValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid Id'),
    validatorMiddleware_1.default
];
