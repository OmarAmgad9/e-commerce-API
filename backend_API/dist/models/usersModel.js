"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UsersSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['manager', 'admin', 'user'], default: 'user' },
    image: String,
    wishlist: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'products' }],
    address: [{
            street: String,
            city: String,
            state: String,
            postalCode: String,
        }],
    active: { type: Boolean, default: true },
    phone: { type: String },
    restCode: String,
    passwordChangedAt: Date,
    restCodeExpireTime: Date,
    restCodeVerify: Boolean
}, {
    timestamps: true
});
UsersSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            next();
        this.password = yield bcryptjs_1.default.hash(this.password, 15);
    });
});
exports.default = (0, mongoose_1.model)('users', UsersSchema);
