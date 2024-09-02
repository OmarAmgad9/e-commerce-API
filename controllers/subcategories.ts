import { Request, Response, NextFunction } from "express";
import asyncHadler from "express-async-handler";
import subcategoryModel from "../models/subcategoryModel";



export const getAllSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
    const subcategory = await subcategoryModel.find()
    res.status(200).json({data:subcategory});
});

export const createSubCategory = asyncHadler(async(req:Request, res: Response, next:NextFunction)=>{
    const subcategory = await subcategoryModel.create(req.body)
    res.status(201).json({data:subcategory});
});

export const getSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
    const sub = await subcategoryModel.findById(req.params.id);
    res.status(200).json({
        data: sub
    });
});
export const updateSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
    const sub = await subcategoryModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.status(201).json({
        data: sub
    });
});
export const deleteSubCategory = asyncHadler(async(req:Request, res:Response, next:NextFunction)=>{
    const sub = await subcategoryModel.findByIdAndDelete(req.params.id);
    res.status(204).json();
});