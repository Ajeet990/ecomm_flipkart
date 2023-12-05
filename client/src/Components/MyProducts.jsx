import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import Product from './Product';
import { addProductSchema } from '../Schemas/AddProductSchema'
import { useFormik } from 'formik'
import {toast} from 'react-toastify'
// import { productApi } from '../Services/productApi';
import { useAddProductMutation, useAddProductImageMutation } from '../Services/productApi';
import { useNavigate } from 'react-router-dom';


const initialValues = {
    product_name: '',
    qty: '',
    description: '',
    price: '',
    category_id: ''
}
const MyProducts = () => {
    const [productImage, setProductImage] = useState('')
    const [addProductApi] = useAddProductMutation()
    const [uploadProductImage] = useAddProductImageMutation()
    const navigate = useNavigate()

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: addProductSchema,
        onSubmit: async (values) => {
            if (!productImage) {
                toast.warning("Product image is required.")
            } else {   
                const productImgPath = await uploadProductImage(productImage)
                values.filename = productImgPath.data.filename
                // console.log(values)
                await addProductApi(values)
                toast.success("Product addedd.")
                navigate('/my_product')
            }
        }
    })
    return (
        <div className='container'>
            {/* <button type="button" className="btn btn-primary">Add Product <FaPlus /></button>
        <Product /> */}
            <button type="button" className="btn btn-primary my-1" data-bs-toggle="modal" data-bs-target="#addProduct">
                Add Product <FaPlus />
            </button>

            <div className="modal fade" id="addProduct" tabIndex="-1" aria-labelledby="addProduct" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addProductModal">Add Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" onChange={handleChange} onBlur={handleBlur} className="form-control" name='product_name' id="product_name" placeholder='Enter product name' />
                                    {errors.product_name && touched.product_name ? (
                                        <span className='registerError'>{errors.product_name}</span>) : null
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Quantity</label>
                                    <input type="Number" onChange={handleChange} onBlur={handleBlur} className="form-control" name='qty' id="Product_Quantity" placeholder='Enter product quantity' />
                                    {errors.qty && touched.qty ? (
                                        <span className='registerError'>{errors.qty}</span>) : null
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    {/* <input type="text" className="form-control" id="Description" /> */}
                                    <textarea type='text' onChange={handleChange} onBlur={handleBlur} name="description" id="description" cols="50" rows="5" placeholder='Enter product description'></textarea>
                                    {errors.description && touched.description ? (
                                        <span className='registerError'>{errors.description}</span>) : null
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="text" onChange={handleChange} onBlur={handleBlur} name='price' className="form-control" id="Price" placeholder='Enter price' />
                                    {errors.price && touched.price ? (
                                        <span className='registerError'>{errors.price}</span>) : null
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Category</label>
                                    <select className="form-select" onChange={handleChange} onBlur={handleBlur} name='category_id' aria-label="Default select example">
                                        <option defaultValue>Select Product Category</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                    {errors.category_id && touched.category_id ? (
                                        <span className='registerError'>{errors.category_id}</span>) : null
                                    }
                                </div>
                                <div className="mb-3">
                                    {/* <input type="file" /> */}
                                    <label htmlFor="exampleInputEmail1" className="form-label">Product Image</label>
                                    <input type="file" className="form-control" id="productImage" onChange={(e) => setProductImage(e.target.files[0])} name="cutomerProfile" />

                                </div>

                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>

            <Product />
        </div>
    )
}

export default MyProducts