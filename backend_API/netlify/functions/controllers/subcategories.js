"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubCategory = exports.updateSubCategory = exports.getSubCategory = exports.createSubCategory = exports.getAllSubCategory = exports.filterSubcategories = void 0;
const subcategoryModel_1 = __importDefault(require("../models/subcategoryModel"));
const refactorHandling_1 = require("./refactorHandling");
// export const filterSubcategories = (req:Request, res:Response, next:NextFunction)=>{
//     let filterData: FilterData = {}
//     if(req.params.categoryId){
//         filterData.category = req.params.categoryId
//         console.log(filterData.category);
//     }
//     req.filterData = filterData;
//     next()
// }
const filterSubcategories = (req, res, next) => {
    let filterData = {};
    if (req.params.categoryId) {
        filterData.category = req.params.categoryId;
    }
    req.filterData = filterData;
    next();
};
exports.filterSubcategories = filterSubcategories;
exports.getAllSubCategory = (0, refactorHandling_1.getAll)(subcategoryModel_1.default, 'subcategory');
exports.createSubCategory = (0, refactorHandling_1.createDoc)(subcategoryModel_1.default);
exports.getSubCategory = (0, refactorHandling_1.getOne)(subcategoryModel_1.default);
exports.updateSubCategory = (0, refactorHandling_1.UpdateOne)(subcategoryModel_1.default);
exports.deleteSubCategory = (0, refactorHandling_1.deleteOne)(subcategoryModel_1.default);
// export const getAllSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
//     const subcategory = await subcategoryModel.find()
//     res.status(200).json({data:subcategory});
// });
// export const createSubCategory = asyncHadler(async(req:Request, res: Response, next:NextFunction)=>{
//     const subcategory = await subcategoryModel.create(req.body)
//     res.status(201).json({data:subcategory});
// });
// export const getSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
//     const sub = await subcategoryModel.findById(req.params.id);
//     res.status(200).json({
//         data: sub
//     });
// });
// export const updateSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
//     const sub = await subcategoryModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
//     res.status(201).json({
//         data: sub
//     });
// });
// export const deleteSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
//     const sub = await subcategoryModel.findByIdAndDelete(req.params.id);
//     res.status(204).json();
// });
