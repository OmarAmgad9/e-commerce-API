import { Router } from "express";
import { getAllCategories, createCategories, getCategory, updatecategory, deletecategory } from "../controllers/categories";
import subcategoryRoute from "./subcategory";
import * as all from "../interfaces"
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utils/validator/categoryValidator";

const categoriesRoute: Router = Router();

categoriesRoute.use('/:categoryId/subcategories', subcategoryRoute)

categoriesRoute.route('/')
    .get(getAllCategories)
    .post(createCategoryValidator,createCategories);

categoriesRoute.route("/:id")
    .get(getCategoryValidator,getCategory)
    .put(updateCategoryValidator,updatecategory)
    .delete(deleteCategoryValidator,deletecategory);

export default categoriesRoute