"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getReview = exports.CreateReview = exports.getAllReviews = exports.setProductAndUserId = exports.filterReviews = void 0;
const reviewModel_1 = __importDefault(require("../models/reviewModel"));
const refactorHandling_1 = require("./refactorHandling");
const filterReviews = (req, res, next) => {
    var _a, _b;
    let filterData = {};
    if (req.params.productId) {
        filterData.product = req.params.productId;
    }
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) && !req.params.productId) {
        filterData.user = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id;
    }
    ;
    next();
};
exports.filterReviews = filterReviews;
const setProductAndUserId = (req, res, next) => {
    var _a;
    if (!req.body.user) {
        req.body.user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    }
    ;
    if (!req.body.product) {
        req.body.product = req.params.productId;
    }
    ;
    next();
};
exports.setProductAndUserId = setProductAndUserId;
exports.getAllReviews = (0, refactorHandling_1.getAll)(reviewModel_1.default, 'reviews');
exports.CreateReview = (0, refactorHandling_1.createDoc)(reviewModel_1.default);
exports.getReview = (0, refactorHandling_1.getOne)(reviewModel_1.default);
exports.updateReview = (0, refactorHandling_1.UpdateOne)(reviewModel_1.default);
exports.deleteReview = (0, refactorHandling_1.deleteOne)(reviewModel_1.default);
