"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const address_1 = require("../controllers/address");
const addressValidator_1 = require("../utils/validator/addressValidator");
const addressRoute = (0, express_1.Router)();
addressRoute.use(auth_1.protectRoutes, auth_1.checkActiveUser, (0, auth_1.allowedTo)('user'));
addressRoute.route('/')
    .get(address_1.getUserAddress)
    .post(addressValidator_1.addAddressValidator, address_1.addAddress);
addressRoute.route('/:addressId')
    .delete(addressValidator_1.removeAddressValidator, address_1.deleteAddress);
exports.default = addressRoute;
