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
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.createProduct = exports.getAllProduct = exports.resizeProductImages = exports.uploadProductImages = void 0;
const refactorHandling_1 = require("./refactorHandling");
const product_1 = __importDefault(require("../models/product"));
const sharp_1 = __importDefault(require("sharp"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const uploadImage_1 = require("../middlewares/uploadImage");
exports.uploadProductImages = (0, uploadImage_1.uploadMultiImages)([{ name: 'cover', maxCount: 1 }, { name: 'images', maxCount: 5 }]);
exports.resizeProductImages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if (req.file) {
    //   const imgName = `product-${Date.now()}.webp`
    //   await sharp(req.file.buffer)
    //     .resize(500, 500)
    //     .toFormat('webp')
    //     .webp({ quality: 95 })
    //     .toFile(`uploads/products/${imgName}`)
    //   req.body.cover = imgName;
    // }
    if (req.files) {
        if (req.files.cover) {
            const imgName = `product-${Date.now()}-cover.webp`;
            yield (0, sharp_1.default)(req.files.cover[0].buffer)
                .resize(500, 500)
                .toFormat('webp')
                .webp({ quality: 95 })
                .toFile(`uploads/products/${imgName}`);
            req.body.cover = imgName;
        }
        if (req.files.images) {
            req.body.images = [];
            yield Promise.all(req.files.images.map((image, index) => __awaiter(void 0, void 0, void 0, function* () {
                const imgName = `product-${Date.now()}N${index}-.webp`;
                yield (0, sharp_1.default)(image.buffer)
                    .toFormat('webp')
                    .webp({ quality: 95 })
                    .toFile(`uploads/products/${imgName}`);
                req.body.images.push(imgName);
            })));
        }
    }
    next();
}));
exports.getAllProduct = (0, refactorHandling_1.getAll)(product_1.default, 'product');
exports.createProduct = (0, refactorHandling_1.createDoc)(product_1.default);
exports.getProduct = (0, refactorHandling_1.getOne)(product_1.default);
exports.updateProduct = (0, refactorHandling_1.UpdateOne)(product_1.default);
exports.deleteProduct = (0, refactorHandling_1.deleteOne)(product_1.default);
