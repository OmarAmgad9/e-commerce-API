import { Product } from "../interfaces/product";
import { getAll, createDoc, getOne, UpdateOne, deleteOne } from "./refactoryHandling";
import  productSchema  from "../models/product"



export const getAllProduct = getAll<Product>(productSchema, 'product');
export const createProduct = createDoc<Product>(productSchema);
export const getProduct = getOne<Product>(productSchema)
export const updateProduct = UpdateOne<Product>(productSchema)
export const deleteProduct = deleteOne<Product>(productSchema)