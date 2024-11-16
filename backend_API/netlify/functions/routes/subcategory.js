"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategories_1 = require("../controllers/subcategories");
const subCategoryValidator_1 = require("../utils/validator/subCategoryValidator");
const auth_1 = require("../controllers/auth");
const subcategoryRoute = (0, express_1.Router)({ mergeParams: true });
subcategoryRoute.route('/')
    .get(subcategories_1.filterSubcategories, subcategories_1.getAllSubCategory)
    .post(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager', 'admin'), subCategoryValidator_1.createSubCategoryValidator, subcategories_1.createSubCategory);
subcategoryRoute.route('/:id')
    .get(subCategoryValidator_1.getSubCategoryValidator, subcategories_1.getSubCategory)
    .put(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager', 'admin'), subCategoryValidator_1.updateSubCategoryValidator, subcategories_1.updateSubCategory)
    .delete(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager', 'admin'), subCategoryValidator_1.deleteSubCategoryValidator, subcategories_1.deleteSubCategory);
exports.default = subcategoryRoute;
