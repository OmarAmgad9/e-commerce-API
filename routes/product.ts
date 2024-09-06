import { Router } from "express";
import product from "../models/product";
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from "../controllers/product";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utitls/validator/productValidator";




const productRoute: Router = Router()

productRoute.route('/')
    .get(getAllProduct)
    .post(createProductValidator,createProduct)

productRoute.route('/:id')
    .get(getProductValidator,getProduct)
    .put(updateProductValidator,updateProduct)
    .delete(deleteProductValidator,deleteProduct)

export default productRoute