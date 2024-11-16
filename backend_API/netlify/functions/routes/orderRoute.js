"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const orderVallidator_1 = require("../utils/validator/orderVallidator");
const order_1 = require("../controllers/order");
const ordersRoute = (0, express_1.Router)();
ordersRoute.use(auth_1.protectRoutes, auth_1.checkActiveUser);
ordersRoute.route('/')
    .get(order_1.filterOrders, order_1.getAllOrders)
    .post((0, auth_1.allowedTo)('user'), orderVallidator_1.createOrderValidator, order_1.createCashOrder);
ordersRoute.route('/:id').get(orderVallidator_1.getOrderValidator, order_1.getOrder);
ordersRoute.use((0, auth_1.allowedTo)('manager', 'admin'));
ordersRoute.route('/:id/paid').put(orderVallidator_1.getOrderValidator, order_1.payOrder);
ordersRoute.route('/:id/delivered').put(orderVallidator_1.getOrderValidator, order_1.deliverOrder);
exports.default = ordersRoute;
