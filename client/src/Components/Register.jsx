import React, { useState } from 'react'
import { useFormik } from 'formik'
import { registerSchema } from '../Schemas/RegisterSchema'
import { toast } from 'react-toastify'
import {
    useUploadProfileMutation,
    useRegisterMutation,
    useSendMailToUserMutation,
    useUpdateUserProfileMutation
} from '../Services/authApi'
import SendMail from '../SendMailSystem/SendMail'
import { Navigate, useNavigate } from 'react-router-dom'
const initialValues = {
    username: '',
    email: '',
    password: '',
    cpassword: '',
    locality: '',
    street: '',
    zipcode: ''
}
const Register = () => {
    const [profile, setProfile] = useState('')
    const [upload] = useUploadProfileMutation()
    const [register] = useRegisterMutation()
    const history = useNavigate()
    const [sendMail] = useSendMailToUserMutation()
    const [updateUserProfile] = useUpdateUserProfileMutation()
    const [loading, setLoading] = useState(false)


    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            if (!profile) {
                toast.warning("Profile is required.")
            } else {
                setLoading(true)
                // console.log("values are:", values)
                const otp = Math.floor(100000 + Math.random() * 900000)
                values.registrationOTP = otp
                const registerResult = await register(values)
                // console.log("data:", registerResult)
                if (registerResult.data.success) {
                    const imageUploadResult = await upload(profile)
                    // console.log("here",imageUploadResult)
                    if (imageUploadResult.data.success) {
                        const data = { email: values.email, otp: otp }
                        await updateUserProfile({email:values.email, profilePic:imageUploadResult.data.filename})
                        await sendMail(data)
                        toast.success("OTP send successfully.")
                        history('/sendMail', { state: data })
                    } else {
                        toast.success("Image upload failed.")
                    }
                } else {
                    toast.error(registerResult.data.message)
                }



            }
        }
    })
    return (
        <div className='container'>
            <h1>Free Flipkart Account</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label"><u>User Name</u></label>
                    <input type="text" className="form-control" name="username" id="username" aria-describedby="emailHelp" onChange={handleChange} onBlur={handleBlur} />
                    {errors.username && touched.username ? (
                        <span className='registerError'>{errors.username}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><u>Email address</u></label>
                    <input type="email" className="form-control" name="email" id="useremail" aria-describedby="emailHelp" onChange={handleChange} onBlur={handleBlur} />
                    {errors.email && touched.email ? (
                        <span className='registerError'>{errors.email}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><u>Password</u></label>
                    <input type="password" className="form-control" name='password' id="pass" aria-describedby="emailHelp" onChange={handleChange} onBlur={handleBlur} />
                    {errors.password && touched.password ? (
                        <span className='registerError'>{errors.password}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><u>Confirm Password</u></label>
                    <input type="password" className="form-control" name='cpassword' id="cpass" aria-describedby="emailHelp" onChange={handleChange} onBlur={handleBlur} />
                    {errors.cpassword && touched.cpassword ? (
                        <span className='registerError'>{errors.cpassword}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><u>Your mobile no.</u></label>
                    <input type="tel" className="form-control" name='mobile' id="mobile" aria-describedby="emailHelp" onChange={handleChange} onBlur={handleBlur} />
                    {errors.mobile && touched.mobile ? (
                        <span className='registerError'>{errors.mobile}</span>) : null
                    }
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><u>Enter your full address</u></label>
                    <div className='row'>
                        <div className='col-md-5'>
                            <label htmlFor="exampleInputEmail1" className="form-label">Locality</label>
                            <input type="text" name='locality' className="form-control" onChange={handleChange} onBlur={handleBlur} />
                            {errors.locality && touched.locality ? (
                                <span className='registerError'>{errors.locality}</span>) : null
                            }
                        </div>
                        <div className='col-md-5'>
                            <label htmlFor="exampleInputEmail1" className="form-label">Street</label>
                            <input type="text" name='street' className="form-control" onChange={handleChange} onBlur={handleBlur} />
                            {errors.street && touched.street ? (
                                <span className='registerError'>{errors.street}</span>) : null
                            }
                        </div>
                        <div className='col-md-2'>
                            <label htmlFor="exampleInputEmail1" className="form-label">zipcode</label>
                            <input type="number" name='zipcode' className="form-control" onChange={handleChange} onBlur={handleBlur} />
                            {errors.zipcode && touched.zipcode ? (
                                <span className='registerError'>{errors.zipcode}</span>) : null
                            }
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><u>Become a Seller</u></label><br />
                    <input type="radio" className='mx-1' name='isSeller' value='true' onChange={handleChange} />Yes &nbsp;
                    <input type="radio" className='mx-1' name='isSeller' value='false' onChange={handleChange} defaultChecked />No
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><u>Gender</u></label><br />
                    <input type="radio" className='mx-1' name='gender' value='Male' onChange={handleChange} defaultChecked />Male &nbsp;
                    <input type="radio" className='mx-1' name='gender' value='Female' onChange={handleChange} />Female &nbsp;
                    <input type="radio" className='mx-1' name='gender' value='Other' onChange={handleChange} />Other
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><u>Upload profile image</u></label>
                    <input type="file" className="form-control" id="profileImage" onChange={(e) => setProfile(e.target.files[0])} name="cutomerProfile" />
                </div>

                <button type="submit" className="btn btn-primary">Register</button>
                {
                    loading && (<><div className="spinner-border text-info" role="status"></div>
                        <span>Please wait. Sending mail... </span>
                    </>)
                }
            </form>
        </div>
    )
}

export default Register