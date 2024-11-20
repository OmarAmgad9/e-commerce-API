"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const carts_1 = require("../controllers/carts");
const cartValidator_1 = require("../utils/validator/cartValidator");
const cartRoute = (0, express_1.Router)();
cartRoute.use(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('user'));
cartRoute.route('/')
    .get(carts_1.getUserCart)
    .post(cartValidator_1.addProductToCartValidator, carts_1.addProductToCart)
    .delete(carts_1.deleteUserCart);
cartRoute.put('/applyCoupon', carts_1.applyCoupon);
cartRoute.route('/:itemId')
    .put(cartValidator_1.updateProductQuantityValidator, carts_1.updateProductQuantity)
    .delete(cartValidator_1.removeProductFromCartValidator, carts_1.removeProductFromCart);
exports.default = cartRoute;
