import express from 'express'
import {addProduct, deleteProduct, getProducts} from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.post('/addProduct', addProduct)
productRouter.delete('/deleteProduct', deleteProduct)
productRouter.get('/getProductList', getProducts)

export default productRouter
