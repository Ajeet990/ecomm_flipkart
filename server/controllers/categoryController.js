import {addCategoryRepo, getAllCategories} from '../repositories/categoryRepo.js'


export const addCategory = (req, res) => {
    const categoryDetail = req.body
    addCategoryRepo(categoryDetail, (err, data) => {
        if (err) return res.status(500).json({message:"Something went wrong."})
        if (data) {
            return res.status(200).json({success:true, message:"Category added successfully."})
        }
    })
}

export const getCategoryList = async (req, res) => {
    // console.log("getting category list")
    getAllCategories((err, data) => {
        if (data) {
            // console.log("data", data)
            return res.status(200).json({success:true, message:"List of all categories", data:data})
        } else {
            // console.log("err", err)
            return res.status(200).json({success:false, message:"Category not found", data:[]})

        }
    })
}