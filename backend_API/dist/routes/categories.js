"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = require("../controllers/categories");
const subcategory_1 = __importDefault(require("./subcategory"));
const categoryValidator_1 = require("../utils/validator/categoryValidator");
const auth_1 = require("../controllers/auth");
const categoriesRoute = (0, express_1.Router)();
categoriesRoute.use('/:categoryId/subcategories', subcategory_1.default);
categoriesRoute.route('/')
    .get(categories_1.getAllCategories)
    .post(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager', 'admin'), categories_1.createCategories);
// .post(protectRoutes, checkActiveUser,allowedTo('manager', 'admin'),createCategoryValidator,createCategories);
categoriesRoute.route("/:id")
    .get(categoryValidator_1.getCategoryValidator, categories_1.getCategory)
    .put(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager', 'admin'), categoryValidator_1.updateCategoryValidator, categories_1.updatecategory)
    .delete(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager', 'admin'), categoryValidator_1.deleteCategoryValidator, categories_1.deletecategory);
exports.default = categoriesRoute;
