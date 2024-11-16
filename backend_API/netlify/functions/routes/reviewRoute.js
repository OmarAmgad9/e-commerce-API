"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_1 = require("../controllers/review");
const auth_1 = require("../controllers/auth");
const reviewValidator_1 = require("../utils/validator/reviewValidator");
const reviewRoute = (0, express_1.Router)({ mergeParams: true });
reviewRoute.route('/')
    .get(review_1.filterReviews, review_1.getAllReviews)
    .post(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('user'), review_1.setProductAndUserId, reviewValidator_1.CreateReviewValidator, review_1.CreateReview);
reviewRoute.route('/:id')
    .get(review_1.getReview, review_1.getReview)
    .put(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('user'), reviewValidator_1.updateReviewValidator, review_1.updateReview)
    .delete(auth_1.protectRoutes, auth_1.checkActiveUser, reviewValidator_1.deleteReviewValidator, review_1.deleteReview);
exports.default = reviewRoute;
