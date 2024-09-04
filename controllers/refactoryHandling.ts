import asyncHandler from 'express-async-handler';
import { Model, modelNames } from "mongoose";
import { Request, Response, NextFunction } from "express";

//Make GRUD Operation to used easy
// GETALL CREATE GETONE UPDATE DELETE


                     //interface pass
export const getAll = <modelType>(model:Model<any> , modelNames:string )=>
    asyncHandler(async(req:Request, res:Response, next:NextFunction)=>{
        const doc = await model.find()
        res.status(200).json({
            data: doc
        })
    });
export const createDoc = <modelType>(model:Model<any>) =>
    asyncHandler(async(req:Request, res: Response, next:NextFunction)=>{
        const doc = await model.create(req.body);
        res.status(201).json({
            data: doc
        })
    });

export const getOne = <modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
        const doc = await model.findById(req.params.id);
        res.status(200).json({
            data: doc
        })
    });
export const UpdateOne = <modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
        const doc = await model.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json({
            data: doc
        })
    });
export const deleteOne = <modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
        const doc = await model.findByIdAndDelete(req.params.id);
        res.status(204).json()
    });
