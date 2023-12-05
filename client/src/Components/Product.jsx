import React from 'react'

const Product = () => {
  return (
    <div className='container my-2'>
        <div className='row my-1 border'>
            <div className='col-md-4'>
                This is photo
            </div>
            <div className='col-md-6'>
                this is description
            </div>
            <div className='col-md-2'>
                this is price
            </div>
        </div>
        <hr />
    </div>
  )
}

export default Product