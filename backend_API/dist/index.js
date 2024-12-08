"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const i18n_1 = require("i18n");
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '3kb' }));
app.use((0, cors_1.default)({
    // origin: ['http://localhost:4200', 'http://shop-72537.web.app'],
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-API-KEY'],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
// app.use(csurf({
//     cookie:{
//         httpOnly: true,
//         secure:true,
//         sameSite: 'strict'
//     }
// }))
app.use(express_1.default.static('uploads'));
dotenv_1.default.config();
app.use((0, compression_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, hpp_1.default)({ whitelist: ['price', 'category', 'subcategory'] }));
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: { policy: 'same-origin' } }));
const i18n = new i18n_1.I18n({
    locales: ['en', 'ar'],
    directory: path_1.default.join(__dirname, 'locales'),
    defaultLocale: 'en',
    queryParameter: 'lang'
});
app.use(i18n.init);
(0, db_1.default)();
(0, routes_1.default)(app);
let server;
server = app.listen(process.env.PORT, () => {
    console.log(`Server listen on Port ${process.env.PORT}`);
});
process.on('unhandledRejection', (err) => {
    server.close(() => {
        console.log(`unhandledRejection error: ${err.name} || ${err.message} `);
        process.exit(1);
    });
});
process.on('unhandledRejection', (err) => {
    console.error(`unhandledRejection Error : ${err.name} | ${err.message}`);
    server.close(() => {
        console.error('Application is shutting down...');
        process.exit(1);
    });
});
