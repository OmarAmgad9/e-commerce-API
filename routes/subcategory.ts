import { Router } from "express";
import { getAllSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, createSubCategory,filterSubcategories } from "../controllers/subcategories";
import * as all from "../interfaces"



const subcategoryRoute: Router = Router({mergeParams:true});

subcategoryRoute.route('/')
    .get(filterSubcategories,getAllSubCategory)
    .post(createSubCategory)

subcategoryRoute.route('/:id')
    .get(getSubCategory)
    .put(updateSubCategory)
    .delete(deleteSubCategory)


export default subcategoryRoute;