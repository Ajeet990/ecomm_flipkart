import * as YUP from 'yup'

export const registerSchema = YUP.object({
    username:YUP.string().min(5).max(30).required("Please enter your username"),
    email:YUP.string().email().required("Please enter your email address"),
    mobile:YUP.string().min(10).max(15).required("Please enter your phone"),
    // gender:YUP.string().required("gender field is required"),
    // address:YUP.string().required("Please enter your address"),
    locality:YUP.string().min(10).required("Please enter locality."),
    street:YUP.string().min(5).required("Please enter street."),
    zipcode:YUP.string().min(6).required("Please enter zipcode."),
    password:YUP.string().min(6).required("Please enter your password"),
    // userProfile:YUP.file().required("Please choose your profile."),
    cpassword:YUP.string().required().oneOf([YUP.ref("password"), null], "Password must be the same.")
})