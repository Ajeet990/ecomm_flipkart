import Category from "../models/categoryModel.js";
import moment from "moment";
import { nanoid } from "nanoid";

export const addCategoryRepo = async (categoryDetail, result) => {
    // console.log("product details are", productDetail)
    const todayDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    const categoryData = new Category({
        category_id:nanoid(),
        category_name:categoryDetail.category_name,
        date_created:todayDate,
    })


    const insertRst = await categoryData.save()
    result(null, true)

}

export const getAllCategories = async (result) => {
    const allCategory = await Category.find({is_active:true})
    if (allCategory.length > 0) {
        return result(null, allCategory)
    } else {
        return result("not found",[])
    }
}