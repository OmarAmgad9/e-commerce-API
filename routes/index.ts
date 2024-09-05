import { Application } from "express"
import categoriesRoute from "./categories";
import subcategoryRoute from "./subcategory";
import globalError from "../middlewares/globalError";
import ApiError from "../utitls/apiError";
import { Request, Response, NextFunction } from "express";
import productRoute from "./product";



const mountRoute = (app:Application)=>{
    app.use('/api/v1/categories', categoriesRoute);
    app.use('/api/v1/subcategory', subcategoryRoute);
    app.use('/api/v1/product', productRoute);
    app.all('*', (req:Request, res:Response, next:NextFunction)=>{
        return next(new ApiError(`This Route ${req.originalUrl} Not Found`, 400))
    });
    app.use(globalError)
}

export default mountRoute