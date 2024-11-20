"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subcategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    image: String,
    category: { type: mongoose_1.Schema.ObjectId, required: true, ref: 'categories' }
}, {
    timestamps: true
});
subcategorySchema.pre(/^find/, function (next) {
    this.populate({ path: 'category', select: 'name' });
    next();
});
exports.default = (0, mongoose_1.model)('subcategory', subcategorySchema);
