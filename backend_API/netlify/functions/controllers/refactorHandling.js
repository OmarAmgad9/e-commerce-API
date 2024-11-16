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
exports.deleteOne = exports.UpdateOne = exports.getOne = exports.createDoc = exports.getAll = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const feature_1 = __importDefault(require("../utils/feature"));
//Make GRUD Operation to used easy
// GETALL CREATE GETONE UPDATE DELETE
//interface pass
// export const getAll = <modelType>(model:Model<any> , modelNames:string )=>
//     asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
//         let filterData: any = {}
//         if(req.filterData){
//             filterData = req.filter
//         }
//         const doc: modelType[] = await model.find(filterData)
//         res.status(200).json({
//             data: doc
//         })
//     });
// export const getAll = <modelType>(model: Model<any>, modelName: string) =>
//     asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//         let filterData: any = {};
//         let searchLength:number =0;
//         if (req.filterData) {
//             filterData = req.filterData;
//         }
//         if(req.query){
//             const searchResult:Features = new Features(model.find(filterData), req.query);
//             const searchData:modelType[] = await searchResult.mongooseQuery;
//             searchLength = searchData.length;
//         }
//         const documentCount =  searchLength|| await model.find().countDocuments()
//         const feature: Features = new Features(model.find(filterData), req.query).sort().limitFields().search(modelName).pagination(documentCount)
//         // const documents: modelType[] = await model.find(filterData)
//         const { mongooseQuery, paginationResult} = feature;
//         const documents: modelType[] = await mongooseQuery;
//         res.status(200).json({ length:documents.length ,pagination: paginationResult ,data: documents })
//     });
const getAll = (model, modelName) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let filterData = {};
    let searchLength = 0;
    if (req.filterData) {
        filterData = req.filterData;
    }
    if (req.query) {
        const searchResult = new feature_1.default(model.find(filterData), req.query).filter().search(modelName);
        const searchData = yield searchResult.mongooseQuery;
        searchLength = searchData.length;
    }
    const documentsCount = searchLength || (yield model.find(filterData).countDocuments());
    const features = new feature_1.default(model.find(filterData), req.query).filter().sort().limitFields().search(modelName).pagination(documentsCount);
    const { mongooseQuery, paginationResult } = features;
    const documents = yield mongooseQuery;
    res.status(200).json({ length: documents.length, pagination: paginationResult, data: documents });
}));
exports.getAll = getAll;
const createDoc = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield model.create(req.body);
    res.status(201).json({
        data: doc
    });
}));
exports.createDoc = createDoc;
const getOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield model.findById(req.params.id);
    if (!doc) {
        return next(new apiError_1.default('Document Not Found', 404));
    }
    res.status(200).json({
        data: doc
    });
}));
exports.getOne = getOne;
const UpdateOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) {
        return next(new apiError_1.default('Document Not Found', 404));
    }
    res.status(200).json({
        data: doc
    });
}));
exports.UpdateOne = UpdateOne;
const deleteOne = (model) => (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new apiError_1.default('Document Not Found', 404));
    }
    res.status(204).json();
}));
exports.deleteOne = deleteOne;
/// delete review is Task for sunday !Very Important
