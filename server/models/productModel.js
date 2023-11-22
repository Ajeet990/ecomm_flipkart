import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_id:{
        type:String,
        required:true,
    },
    product_name:{
        type:String,
        required:true
    },
    category_id:{
        type:String,
        required:true
    },
    addedBy:{
        type:String,
        required:true
    },
    date_created:Date,
    date_updated:Date
})

const Product = new mongoose.model('products', productSchema)
export default Product