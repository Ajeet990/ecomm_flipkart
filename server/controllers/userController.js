import { registerRepo } from "../repositories/userRepo.js"
import User from '../models/userModel.js'
// import moment from "moment"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const userRegister = async (req, res) => {
    // return res.status(200).json({message:"Yes working"})
    try {
        const userDetail = req.body
        const userEmailExist = await User.findOne({ email: userDetail.email })
        if (userEmailExist) {
            return res.status(200).json({ success: false, message: "user email already exists." })
        }
        const userMobileExist = await User.findOne({ mobile: userDetail.mobile })
        if (userMobileExist) {
            return res.status(200).json({ success: false, message: "user mobile already exists." })
        }

        registerRepo(userDetail, (err, result) => {
            if (result) {
                return res.status(200).json({ success: true, message: "User registered successfully" })
            }
        })
        // console.log("Detail are:",userDetail)

    } catch (err) {
        console.log("Catch block error")
        return res.status(400).json(err)
    }

}

export const login = async (req, res) => {
    try {
        const logInDetails = req.body
        const userEmailExist = await User.findOne({ email: logInDetails.email })
        // console.log("log", userEmailExist);
        if (userEmailExist) {
            if (userEmailExist.isVerified) {
                const { password: hashPass } = userEmailExist
                const loginRst = await bcrypt.compare(logInDetails.password, hashPass);
                if (loginRst) {
                    const secret_key = process.env.SECRET_KEY
                    return res.status(200).json({
                        success: true,
                        message: "Login success.",
                        data: {
                            userId: userEmailExist.userId,
                            username: userEmailExist.username,
                            email: userEmailExist.email,
                            loginToken: jwt.sign({ time: Date(), userId: userEmailExist.userId }, secret_key)
                        }
                    })
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "Incorrect password.",
                        data: []
                    })
                }
            } else {
                return res.status(200).json({
                    success: false,
                    message: "User not verified. Please verify using valid OTP.",
                    data: []
                })
            }
        } else {
            return res.status(200).json({
                success: false,
                message: "User not registered.",
                data: []
            })
        }

    } catch (error) {
        console.log("Catch block error")
        return res.status(400).json(err)
    }
}

export const uploadProfile = async (req, res) => {
    console.log("yes here")
}

export const checkOtp = async (req, res) => {
    const otp = req.body.otp
    const email = req.body.email
    // console.log(otp, email)
    const checkOtp = await User.findOne({ registrationOTP: otp, email: email })
    if (checkOtp) {
        await User.updateOne({ 'email': email }, { $set: { 'isVerified': true } })
        return res.status(200).json({ success: true, message: "OTP vefified." })
    } else {
        return res.status(200).json({ success: false, message: "Wrong OTP." })
    }
}

export const updateProfile = async (req, res) => {
    const email = req.body.email
    const profilePic = req.body.profilePic
    const checkUser = await User.findOne({ email: email })
    if (checkUser) {
        await User.updateOne({ 'email': email }, { $set: { 'profilePic': profilePic } })
        return res.status(200).json({ success: true, message: "Profile updated" })
    } else {
        return res.status(200).json({ success: false, message: "User not found." })
    }
}