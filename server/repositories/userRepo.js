import moment from "moment";
import User from '../models/userModel.js'
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt'


export const registerRepo = async (userDetail, result) => {
    // console.log(userDetail)
    const todayDate = moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    const address = {
        locality:userDetail.locality ?? '',
        street:userDetail.street ?? '',
        zipcode:userDetail.zipcode ?? 0
    }
    const hashPassword = await bcrypt.hash(userDetail.password, 10);
    const userData = new User({
        userId:nanoid(),
        username:userDetail.username,
        email:userDetail.email,
        password:hashPassword,
        mobile:userDetail.mobile,
        profilePic:'',
        gender:userDetail.gender ?? 'Male',
        isSeller:userDetail.isSeller ?? false,
        isVerified:userDetail.isVerified ?? false,
        registrationOTP:userDetail.registrationOTP,
        address:address,
        date_created:todayDate,
    })

    const insertRst = await userData.save()
    // console.log(userData)
    result(null, true)
}

export const findUserById = async (userId, result) => {
    const userDetail = await User.findOne({userId:userId})
    // console.log("u d",userDetail)
    if (userDetail) {
        result(null, true)
    } else {
        result(false, null)
    }
}