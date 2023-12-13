import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import { useGetProductMutation } from '../Services/productApi';
import { addProductSchema } from '../Schemas/AddProductSchema';
import { Link } from 'react-router-dom';


const initialValues = {
  product_name: '',
  qty: '',
  description: '',
  price: '',
  category_id: ''
}
const EditProduct = () => {
  const product_id = useLocation().pathname.split("/")[2]
  const [getProduct] = useGetProductMutation()
  const [productDetail, setProductDetail] = useState({})
  useEffect(() => {
    async function fetchProductData() {
      const response = await getProduct({ productId: product_id });
      let product_detail = await response?.data?.data[0]
      setProductDetail(product_detail)
    }
    fetchProductData()
  }, [])
  // console.log(productDetail)


  return (
    <>
      <div className='container my-2'>
        <h1>Edit your product</h1>

        <form>
          <img src={"../../public/upload/productImages/" + productDetail.product_image} alt="" />
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='product_name' id="product_name" placeholder='Enter product name' value={productDetail.product_name}/>
            {/* {errors.product_name && touched.product_name ? (
              <span className='registerError'>{errors.product_name}</span>) : null
            } */}
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Quantity</label>
            <input type="Number" className="form-control" name='qty' id="Product_Quantity" placeholder='Enter product quantity' value={productDetail.product_qty} />
            {/* {errors.qty && touched.qty ? (
              <span className='registerError'>{errors.qty}</span>) : null
            } */}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            {/* <input type="text" className="form-control" id="Description" /> */}
            <textarea type='text' name="description" id="description" cols="50" rows="5" placeholder='Enter product description' value={productDetail.product_description}></textarea>
            {/* {errors.description && touched.description ? (
              <span className='registerError'>{errors.description}</span>) : null
            } */}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" value={productDetail.product_price} name='price' className="form-control" id="Price" placeholder='Enter price' />
            {/* {errors.price && touched.price ? (
              <span className='registerError'>{errors.price}</span>) : null
            } */}
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Category</label>
            <select className="form-select" name='category_id' aria-label="Default select example">
              <option defaultValue>Select Product Category</option>
              {/* {
                categoryList?.data.map((category, index) => {
                  return (<option key={category.category_id} value={category.category_id}>{category.category_name}</option>)
                })
              } */}
            </select>
            {/* {errors.category_id && touched.category_id ? (
              <span className='registerError'>{errors.category_id}</span>) : null
            } */}
          </div>
          <div className="mb-3">
            {/* <input type="file" /> */}
            <label htmlFor="exampleInputEmail1" className="form-label">Product Image</label>
            <input type="file" className="form-control" id="productImage" name="cutomerProfile" />

          </div>

          <button type="submit" className="btn btn-primary">Add product</button>
          <Link to="/my_product" className="btn btn-primary mx-1">Cancel</Link>
        </form>
      </div>
    </>
  )
}

export default EditProduct