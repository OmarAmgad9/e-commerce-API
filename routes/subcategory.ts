import { Router } from "express";
import { getAllSubCategory, getSubCategory, updateSubCategory, deleteSubCategory, createSubCategory } from "../controllers/subcategories";




const subcategoryRoute: Router = Router();

subcategoryRoute.route('/')
    .get(getAllSubCategory)
    .post(createSubCategory)

subcategoryRoute.route('/:id')
    .get(getSubCategory)
    .put(updateSubCategory)
    .delete(deleteSubCategory)


export default subcategoryRoute;