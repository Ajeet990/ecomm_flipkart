import Product from "../models/productModel.js";
import moment from "moment";
import { nanoid } from "nanoid";

export const addProductRepo = async (productDetail, userId, result) => {
    // console.log("product details are", productDetail)
    const todayDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    const productData = new Product({
        product_id:nanoid(),
        product_name:productDetail.product_name,
        category_id:productDetail.category_id,
        addedBy:userId,
        date_created:todayDate,
    })

    const insertRst = await productData.save()
    // console.log(userData)
    result(null, true)

}