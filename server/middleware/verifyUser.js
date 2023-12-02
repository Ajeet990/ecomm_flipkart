import jwt from "jsonwebtoken";
import { findUserById } from '../repositories/userRepo.js'

export const verifyUser = (req, res, next) => {
    // const user_token = jwt.decode(req.get('token'))
    const user_token = jwt.verify(req.get('token'), 'mongoDb_atlas_password_1KGjgeoe8J3lbuNu')
    // console.log("v token",user_token)
    if (user_token == null) {
        return res.status(404).json({success:false, message:"Token not found."})
    }
    const {userId} = user_token
    findUserById(userId, (err, data) => {
        if (data) {
            // console.log("user found")
            // req.currentUserDetail = data
            req.currentUserId = userId
            next()
        } else {
            return res.status(404).json({success:false, message:"User not found."})
        }
    })
}
