"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.updateCoupon = exports.getCoupon = exports.createCoupons = exports.getAllCoupons = void 0;
const couponsModel_1 = __importDefault(require("../models/couponsModel"));
const refactorHandling_1 = require("./refactorHandling");
exports.getAllCoupons = (0, refactorHandling_1.getAll)(couponsModel_1.default, 'coupons');
exports.createCoupons = (0, refactorHandling_1.createDoc)(couponsModel_1.default);
exports.getCoupon = (0, refactorHandling_1.getOne)(couponsModel_1.default);
exports.updateCoupon = (0, refactorHandling_1.UpdateOne)(couponsModel_1.default);
exports.deleteCoupon = (0, refactorHandling_1.deleteOne)(couponsModel_1.default);
