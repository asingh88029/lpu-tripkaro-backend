const httpStatus = require("http-status")
const jwt = require("jsonwebtoken");
const {GetUserByEmailId} = require("./../service/User.service")
require("dotenv").config()

function Authorization(ALLOWED_ROLES){
    // ALLOWED_ROLES = ['admin', 'user']
    return async(req, res, next)=>{
        try{

            const TOKEN = req.headers.authorization.split(" ")[1];

            // Is this token belongs to our app
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
            
            const result = await jwt.verify(TOKEN, JWT_SECRET_KEY)

            const {id , email} = result

            const userResult = await GetUserByEmailId(email)

            if(!userResult.success){
                throw new Error("User is not present")
            }

            const {role} = userResult.data

            // role -> ALLOWED_ROLES
            // "admin" -> ["admin", "user"] : true
            // "user" -> ["admin"] : false

            const roleCheckResult = ALLOWED_ROLES.map(role=>role.toLowerCase()).includes(role.toLowerCase())

            if(!roleCheckResult){
                throw new Error("User in unauthorized")
            }

            req.id = id

            req.email = email

            next() // req will be forwarded further


        }catch(err){
            console.log(err)
            res.status(httpStatus.UNAUTHORIZED).json({
                success : false
            })
        }
    }
}

module.exports = {
    Authorization
}