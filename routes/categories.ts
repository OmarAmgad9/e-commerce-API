import { Router } from "express";
import { getAllCategories, createCategories, getCategory, updatecategory, deletecategory } from "../controllers/categories";
import subcategoryRoute from "./subcategory";
import * as all from "../interfaces"

const categoriesRoute: Router = Router();

categoriesRoute.use('/:categoryId/subcategories', subcategoryRoute)

categoriesRoute.route('/')
    .get(getAllCategories)
    .post(createCategories);

categoriesRoute.route("/:id")
    .get(getCategory)
    .put(updatecategory)
    .delete(deletecategory);

export default categoriesRoute