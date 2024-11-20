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
exports.applyCoupon = exports.updateProductQuantity = exports.removeProductFromCart = exports.addProductToCart = exports.deleteUserCart = exports.getUserCart = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cartsModel_1 = __importDefault(require("../models/cartsModel"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const product_1 = __importDefault(require("../models/product"));
const couponsModel_1 = __importDefault(require("../models/couponsModel"));
exports.getUserCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cartsModel_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!cart) {
        return next(new apiError_1.default('you don\'t have cart yet', 404));
    }
    res.status(200).json({
        length: cart.items.length,
        data: cart
    });
}));
exports.deleteUserCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cartsModel_1.default.findOneAndDelete({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!cart) {
        return next(new apiError_1.default('you don\'t have cart to delete', 404));
    }
    res.status(204).json();
}));
// add product to cart
// get product and add to cart
// calc total price
// save
exports.addProductToCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const prod = yield product_1.default.findById(req.body.product);
    if (!prod) {
        return next(new apiError_1.default('product not found', 404));
    }
    let cart = yield cartsModel_1.default.findOne({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
    });
    if (!cart) {
        cart = yield cartsModel_1.default.create({
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
            items: [{ product: prod._id, price: prod.price }]
        });
    }
    else {
        const productIndex = cart.items.findIndex((item) => item.product._id.toString() === req.body.product.toString());
        if (productIndex > -1) {
            cart.items[productIndex].quantity += 1;
        }
        else {
            cart.items.push({ product: prod._id, price: prod.price });
        }
    }
    calcTotalPrice(cart);
    yield cart.save();
    res.status(200).json({
        length: cart.items.length,
        data: cart
    });
}));
//remove product 
// pull item from cart 
// calc total price
// save cart
exports.removeProductFromCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cartsModel_1.default.findOneAndUpdate({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, {
        $pull: { items: { _id: req.params.itemId } }
    }, { new: true });
    calcTotalPrice(cart);
    yield cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
}));
exports.updateProductQuantity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cartsModel_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    const productIndex = cart.items.findIndex((item) => item._id.toString() === req.params.itemId.toString());
    if (productIndex > -1) {
        cart.items[productIndex].quantity = req.body.quantity;
    }
    else {
        return next(new apiError_1.default('product not exist in cart', 404));
    }
    calcTotalPrice(cart);
    cart.save();
    res.status(200).json({
        length: cart.items.length,
        data: cart
    });
}));
exports.applyCoupon = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const coupon = yield couponsModel_1.default.findOne({
        name: req.body.name,
        expireTime: { $gt: Date.now() }
    });
    if (!coupon) {
        return next(new apiError_1.default('invalid or expired coupon', 400));
    }
    ;
    const cart = yield cartsModel_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    const totalPrice = cart.totalPrice;
    const totalPriceAfterDiscount = (totalPrice - (totalPrice * (coupon.discount / 100))).toFixed(2);
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
    cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
}));
const calcTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.items.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });
    cart.totalPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    return totalPrice;
};
