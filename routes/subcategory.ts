import { Router } from "express";
import { getAllSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, createSubCategory,filterSubcategories } from "../controllers/subcategories";
import * as all from "../interfaces"

import { createSubCategoryValidator, updateSubCategoryValidator,deleteSubCategoryValidator, getSubCategoryValidator } from "../utils/validator/subCategoryValidator";



const subcategoryRoute: Router = Router({mergeParams:true});

subcategoryRoute.route('/')
    .get(filterSubcategories,getAllSubCategory)
    .post(createSubCategoryValidator,createSubCategory)

subcategoryRoute.route('/:id')
    .get(getSubCategoryValidator,getSubCategory)
    .put(updateSubCategoryValidator,updateSubCategory)
    .delete(deleteSubCategoryValidator,deleteSubCategory)
    

export default subcategoryRoute;