import * as YUP from 'yup'

export const addProductSchema = YUP.object({
    product_name:YUP.string().min(5).max(50).required("Please enter product name"),
    qty:YUP.string().required("Please enter quantity"),
    description:YUP.string().required("Please enter product description."),
    price:YUP.string().required("Please enter price"),
    category_id:YUP.string().required("Please select category")
})