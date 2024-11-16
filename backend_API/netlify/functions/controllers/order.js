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
exports.deliverOrder = exports.payOrder = exports.createCashOrder = exports.getOrder = exports.getAllOrders = exports.filterOrders = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cartsModel_1 = __importDefault(require("../models/cartsModel"));
const refactorHandling_1 = require("./refactorHandling");
const orderModel_1 = __importDefault(require("../models/orderModel"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const product_1 = __importDefault(require("../models/product"));
// filter orders if user role === user
exports.filterOrders = (0, express_async_handler_1.default)((req, res, next) => {
    var _a;
    const filterData = {};
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'user') {
        filterData.user = req.user._id;
    }
    ;
    next();
});
// get all orders
exports.getAllOrders = (0, refactorHandling_1.getAll)(orderModel_1.default, 'orders');
// get one order
exports.getOrder = (0, refactorHandling_1.getOne)(orderModel_1.default);
/* create order
1- set tax price
2- get user cart
3- check if user has cart
4- create order and set in order (cartItems, totalPrice, userAddress, taxPrice, userId)
5- update products quantity and sold in cartItems using bulkWrite
6- delete user cart
*/
exports.createCashOrder = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const taxPrice = 100;
    const cart = yield cartsModel_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!cart) {
        return next(new apiError_1.default("you don't have cart to checkout", 400));
    }
    ;
    const order = yield orderModel_1.default.create({
        items: cart.items,
        taxPrice,
        totalPrice: cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice,
        address: req.body.address,
        user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id
    });
    const bulkOption = cart.items.map((item) => ({
        updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -item.quantity, sold: item.quantity } }
        },
    }));
    yield product_1.default.bulkWrite(bulkOption);
    yield cartsModel_1.default.deleteOne({ user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id });
    res.status(200).json({ data: order });
}));
// update order paid
exports.payOrder = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findByIdAndUpdate(req.params.id, {
        isPaid: true,
        paidAt: Date.now()
    }, { new: true });
    res.status(200).json({ data: order });
}));
// update order delivered
exports.deliverOrder = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.default.findByIdAndUpdate(req.params.id, {
        isDelivered: true,
        deliveredAt: Date.now()
    }, { new: true });
    res.status(200).json({ data: order });
}));
