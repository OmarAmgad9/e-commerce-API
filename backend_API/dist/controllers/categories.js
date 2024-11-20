"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletecategory = exports.updatecategory = exports.getCategory = exports.createCategories = exports.getAllCategories = void 0;
const categoriesModel_1 = __importDefault(require("../models/categoriesModel"));
const refactorHandling_1 = require("./refactorHandling");
exports.getAllCategories = (0, refactorHandling_1.getAll)(categoriesModel_1.default, 'categories');
exports.createCategories = (0, refactorHandling_1.createDoc)(categoriesModel_1.default);
exports.getCategory = (0, refactorHandling_1.getOne)(categoriesModel_1.default);
exports.updatecategory = (0, refactorHandling_1.UpdateOne)(categoriesModel_1.default);
exports.deletecategory = (0, refactorHandling_1.deleteOne)(categoriesModel_1.default);
// export const getAllCategories = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
//     const categories: Categories[] = await categoriesModel.find();    
//     res.status(200).json({
//         data: categories    
//     });
// });
// export const createCatgories = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
//     const categories: Categories = await categoriesModel.create(req.body);
//     res.status(201).json({
//         data: categories
//     });
// });
// export const getCategory = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
//     const category = await categoriesModel.findById(req.params.id);
//     res.status(200).json({category})
// });
// export const updateCategory = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
//     const category = await categoriesModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
//     res.status(201).json({
//         data: category
//     });
// });
// export const deleteCategory = asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
//     const category = await categoriesModel.findByIdAndDelete(req.params.id);
//     res.status(204).json();
// });
