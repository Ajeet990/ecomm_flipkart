import express from 'express'
import {addCategory, getCategoryList} from '../controllers/categoryController.js'

const categoryRouter = express.Router()

categoryRouter.post('/addCategory', addCategory)
categoryRouter.get('/getCategoryList', getCategoryList)

export default categoryRouter
