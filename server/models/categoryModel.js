import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category_id:{
        type:String,
        required:true
    },
    category_name:{
        type:String,
        required:true,
    },
    is_active:{
        type:Boolean,
        required:true,
    },
    date_created:Date,
    date_updated:Date
})

const Category = new mongoose.model('categories', categorySchema)
export default Category