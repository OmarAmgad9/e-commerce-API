"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const coupons_1 = require("../controllers/coupons");
const couponsValidator_1 = require("../utils/validator/couponsValidator");
const couponsRoute = (0, express_1.Router)();
couponsRoute.use(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('manager', 'admin'));
couponsRoute.route('/')
    .get(coupons_1.getAllCoupons)
    .post(couponsValidator_1.createCouponValidator, coupons_1.createCoupons);
couponsRoute.route('/:id')
    .get(couponsValidator_1.getCouponValidator, coupons_1.getCoupon)
    .put(couponsValidator_1.updateCouponValidator, coupons_1.updateCoupon)
    .delete(couponsValidator_1.deleteCouponValidator, coupons_1.deleteCoupon);
exports.default = couponsRoute;
