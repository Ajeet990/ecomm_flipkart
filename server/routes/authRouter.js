import express from 'express'
import multer from 'multer'
import {userRegister, login, checkOtp, updateProfile} from '../controllers/userController.js'
import { sendMail } from '../utils/SendMail.js'

const router = express.Router()

// // we can put storage code into seprate file(optional)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload/userProfiles')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
  
const upload = multer({ storage: storage })
router.post('/upload', upload.single('file'), (req, res) => {
const file = req.file
// console.log("body",req.body)
    return res.status(200).json({success:true, filename:file.filename})
})

router.post('/register', userRegister)
router.post('/login', login)
router.post('/checkOtp', checkOtp)
router.post('/sendMail', sendMail)
router.post('/updateProfile', updateProfile)
// router.post('/upload', uploadProfile)

export default router