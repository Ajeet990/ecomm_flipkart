import {addProductRepo} from '../repositories/productRepo.js'
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import jwt from 'jsonwebtoken'

export const addProduct = (req, res) => {
    const productDetail = req.body
    const user_token = jwt.decode(req.get('token'))
    const {userId} = user_token
    addProductRepo(productDetail, userId, (err, data) => {
        if (err) return res.status(500).json({message:"Something went wrong."})
        if (data) {
            return res.status(200).json({success:true, message:"Product added successfully."})
        }
    })
}

export const deleteProduct = async (req, res) => {
    const productId = req.query.productId
    const findProduct = await Product.findOne({product_id:productId})
    console.log(findProduct)
    if (!findProduct) {
        return res.status(200).json({success:false, message:"Product not found."})
    } else {
        const deleteRst = await Product.deleteOne({product_id:productId})
        // console.log(deleteRst)

        if (deleteRst.acknowledged && deleteRst.deletedCount > 0) {
            return res.status(200).json({success:true, message:"Product deleted successfully."})
        } else {
            return res.status(200).json({success:false, message:"Not able to delete."})     
        }
    }

}

export const getProducts = async (req, res) => {
    const user_token = jwt.decode(req.get('token'))
    const {userId} = user_token
    const categories = await Category.find()
    const productList = []
    
    for (const cat of categories) {
        const products = await Product.find(
            {
                addedBy:userId,
                category_id:cat.category_id
            }
        )
        productList.push({category_name:cat.category_name, productList:products})
    }

    return res.status(200).json({success:true, message:"Product list", data:productList})
}