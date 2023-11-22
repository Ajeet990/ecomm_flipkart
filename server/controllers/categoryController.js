import {addCategoryRepo} from '../repositories/categoryRepo.js'


export const addCategory = (req, res) => {
    const categoryDetail = req.body
    addCategoryRepo(categoryDetail, (err, data) => {
        if (err) return res.status(500).json({message:"Something went wrong."})
        if (data) {
            return res.status(200).json({success:true, message:"Category added successfully."})
        }
    })
}