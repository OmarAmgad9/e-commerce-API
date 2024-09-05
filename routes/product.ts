import { Router } from "express";
import product from "../models/product";
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "../controllers/product";




const productRoute: Router = Router()

productRoute.route('/')
    .get(getAllProduct)
    .post(createProduct)

productRoute.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct)

export default productRoute