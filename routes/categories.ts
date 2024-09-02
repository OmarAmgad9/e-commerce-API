import { Router } from "express";
import { getAllCategories, createCatgories, getCategory, updateCategory, deleteCategory } from "../controllers/categories";


const categoriesRoute: Router = Router();

categoriesRoute.route('/')
    .get(getAllCategories)
    .post(createCatgories);

categoriesRoute.route("/:id")
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

export default categoriesRoute