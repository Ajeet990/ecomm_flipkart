import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()


const db = process.env.DATABASE

const dbConn = mongoose.connect(db, {
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(() => {
    console.log("Succefully connected with database")
}).catch((err) => {
    console.log("Error", err)
})

// module.exports = dbConn

// exports.default = dbConn
export default dbConn