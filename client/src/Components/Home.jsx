import React from 'react'
import { useGetProductListQuery } from '../Services/authApi'

const Home = () => {
  // const {data, error, isLoading} = useGetProductListQuery()
  // console.log(data)
  return (
    <div className='container contentHeight'>
      This is home page. It will contain all the products list with all the category
      </div>
  )
}

export default Home