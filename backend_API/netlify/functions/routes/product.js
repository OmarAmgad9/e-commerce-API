"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const productValidator_1 = require("../utils/validator/productValidator");
const auth_1 = require("../controllers/auth");
const productRoute = (0, express_1.Router)();
productRoute.route('/')
    .get(product_1.getAllProduct)
    .post(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager', 'admin'), product_1.uploadProductImages, product_1.resizeProductImages, productValidator_1.createProductValidator, product_1.createProduct);
productRoute.route('/:id')
    .get(productValidator_1.getProductValidator, product_1.getProduct)
    .put(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager', 'admin'), product_1.uploadProductImages, product_1.resizeProductImages, productValidator_1.updateProductValidator, product_1.updateProduct)
    .delete(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager', 'admin'), productValidator_1.deleteProductValidator, product_1.deleteProduct);
exports.default = productRoute;
