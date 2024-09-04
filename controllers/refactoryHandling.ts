import asyncHandler from 'express-async-handler';
import { Model, modelNames } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { FilterData } from '../interfaces/filterData';


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

export const getAll = <modelType>(model: Model<any>, modelName: string) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let filterData: any = {};
        if (req.filterData) {
            filterData = req.filterData
            console.log(req.filterData)
            console.log(`filterData Print: ${filterData}`)
        }
        const documents: modelType[] = await model.find(filterData)
        res.status(200).json({ data: documents })
    });



export const createDoc = <modelType>(model:Model<any>) =>
    asyncHandler(async(req:Request, res: Response, next:NextFunction)=>{
        const doc:modelType = await model.create(req.body);
        res.status(201).json({
            data: doc
        })
    });

export const getOne = <modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
        const doc:modelType | null = await model.findById(req.params.id);
        res.status(200).json({
            data: doc
        })
    });
export const UpdateOne = <modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
        const doc:modelType | null  = await model.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json({
            data: doc
        })
    });
export const deleteOne = <modelType>(model:Model<any>)=>
    asyncHandler(async(req:Request, res:Response, next: NextFunction)=>{
        const doc:modelType | null  = await model.findByIdAndDelete(req.params.id);
        res.status(204).json()
    });
