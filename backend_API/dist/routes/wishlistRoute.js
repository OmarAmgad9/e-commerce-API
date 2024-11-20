"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const wishlist_1 = require("../controllers/wishlist");
const wishlistValidator_1 = require("../utils/validator/wishlistValidator");
const wishlistRoute = (0, express_1.Router)();
wishlistRoute.use(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('user'));
wishlistRoute.route('/')
    .get(wishlist_1.getAllWishList)
    .post(wishlistValidator_1.addToWishlistValidator, wishlist_1.addProductToWishList);
wishlistRoute.route('/:productId')
    .delete(wishlistValidator_1.removeFromWishlistValidator, wishlist_1.deleteProductFromWishList);
exports.default = wishlistRoute;
