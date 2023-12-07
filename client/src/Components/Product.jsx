import React, { useState } from 'react'
import { FaRupeeSign } from "react-icons/fa";

const Product = (productList) => {
    // console.log("here", productList?.props)
    // const [loading, setLoading] = useState(true)
    return (
        <div className='container my-2'>
            {
                productList?.props && productList?.props.map((data, index) => {
                    return (
                        // <div key={index} className='row my-1 border'>
                        <div className='border' key={index}>
                            <h1>{data.category_name}</h1>
                            {
                                data?.productList.map((product, productIndex) => {
                                    return (
                                        <div className='row my-3' key={productIndex}>
                                            <div className='col-md-4'>
                                                <img src={"../../public/upload/productImages/" + product.product_image} alt="" />
                                            </div>
                                            <div className='col-md-6'>
                                                {product.product_description}
                                            </div>
                                            <div className='col-md-2'>
                                               <FaRupeeSign /> {product.product_price}
                                                <button className='btn btn-primary'>Add to kart</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            <hr />
        </div>
    )
}

export default Product