import { Router } from "express";
import { getAllCategories, createCategories, getCategory, updatecategory, deletecategory } from "../controllers/categories";


const categoriesRoute: Router = Router();

categoriesRoute.route('/')
    .get(getAllCategories)
    .post(createCategories);

categoriesRoute.route("/:id")
    .get(getCategory)
    .put(updatecategory)
    .delete(deletecategory);

export default categoriesRoute