import { Router } from "express";
import product from "../models/product";
import { createProduct, deleteProduct, getAllProduct, getProduct, resizeProductImages, updateProduct, uploadProductImages } from "../controllers/product";
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from "../utils/validator/productValidator";




const productRoute: Router = Router()

productRoute.route('/')
    .get(getAllProduct)
    .post(uploadProductImages, resizeProductImages,createProductValidator,createProduct)

productRoute.route('/:id')
    .get(getProductValidator,getProduct)
    .put(updateProductValidator,updateProduct)
    .delete(deleteProductValidator,deleteProduct)

export default productRoute