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
    product_qty:{
        type:Number,
        required:true
    },
    product_description:{
        type:String,
        required:true
    },
    product_price:{
        type:Number,
        required:true
    },
    category_id:{
        type:String,
        required:true
    },
    product_image:{
        type:String,
        required:false
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