"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = __importDefault(require("./categories"));
const subcategory_1 = __importDefault(require("./subcategory"));
const globalError_1 = __importDefault(require("../middlewares/globalError"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const product_1 = __importDefault(require("./product"));
const users_1 = __importDefault(require("./users"));
const authRoute_1 = __importDefault(require("./authRoute"));
const wishlistRoute_1 = __importDefault(require("./wishlistRoute"));
const addressRoute_1 = __importDefault(require("./addressRoute"));
const couponsRoute_1 = __importDefault(require("./couponsRoute"));
const reviewRoute_1 = __importDefault(require("./reviewRoute"));
const cartRoute_1 = __importDefault(require("./cartRoute"));
const orderRoute_1 = __importDefault(require("./orderRoute"));
const mountRoute = (app) => {
    app.use('/api/v1/categories', categories_1.default);
    app.use('/api/v1/subcategory', subcategory_1.default);
    app.use('/api/v1/product', product_1.default);
    app.use('/api/v1/users', users_1.default);
    app.use('/api/v1/auth', authRoute_1.default);
    app.use('/api/v1/carts', cartRoute_1.default);
    app.use('/api/v1/orders', orderRoute_1.default);
    app.use('/api/v1/address', addressRoute_1.default);
    app.use('/api/v1/review', reviewRoute_1.default);
    app.use('/api/v1/wishlist', wishlistRoute_1.default);
    app.use('/api/v1/coupon', couponsRoute_1.default);
    app.all('*', (req, res, next) => {
        return next(new apiError_1.default(`This Route ${req.originalUrl} Not Found`, 400));
    });
    app.use(globalError_1.default);
};
exports.default = mountRoute;
