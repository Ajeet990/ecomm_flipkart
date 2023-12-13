import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import Product from './Product';
import { useGetProductListQuery } from '../Services/productApi';
import { Link } from 'react-router-dom';

const MyProducts = () => {

    const { data: productList, error, isLoading } = useGetProductListQuery()

    return (
        <div className='container my-2'>
            <Link to="/add_product" className='btn btn-primary'>Add product <FaPlus /></Link>
            {
                isLoading ? (<><div className="spinner-border text-info" role="status"></div>
                    <span>Data loading... </span>
                </>) : (
                    <Product props={productList?.data} />
                )
            }
        </div>
    )
}

export default MyProducts