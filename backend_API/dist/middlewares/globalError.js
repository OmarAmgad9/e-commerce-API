"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalError = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'Server Error';
    if (process.env.NODE_ENV == 'dev') {
        res.status(error.statusCode).json({
            statusCode: error.statusCode,
            message: error.message,
            status: error.status,
            stack: error.stack
        });
    }
    else {
        res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    }
};
exports.default = globalError;
