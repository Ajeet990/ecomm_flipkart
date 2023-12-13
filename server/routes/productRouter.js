import express from 'express'
import {addProduct, deleteProduct, getProducts, getProductById } from '../controllers/productController.js'
import multer from 'multer'




const productRouter = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload/productImages')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
  
const upload = multer({ storage: storage })
productRouter.post('/addProductImage', upload.single('productImage'), (req, res) => {
const file = req.file
// console.log("body",req.body)
    return res.status(200).json({success:true, filename:file.filename})
})

productRouter.post('/addProduct', addProduct)
productRouter.delete('/deleteProduct', deleteProduct)
productRouter.get('/getProductList', getProducts)
productRouter.post('/getProductDetail', getProductById)

export default productRouter
