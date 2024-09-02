import { Schema, model } from "mongoose";
import { SubCategoryInterface } from "../interfaces/subcategories";






const subcategorySchema: Schema = new Schema<SubCategoryInterface>({
    name:{type: String, required:true, unique: true,trim:true},
    image: String,
    categories:{type:Schema.ObjectId, ref : 'categories'}
},{
    timestamps: true
});

export default model<SubCategoryInterface>('subcategory', subcategorySchema)