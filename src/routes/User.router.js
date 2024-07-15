const express = require('express')
const multer = require("multer")
const path = require("path")

const {Authorization} = require("./../middlewares/authorization.middleware")

const {UpdateProfilePictureController} = require("./../controller/User.controller")

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename : (req, file, cb)=>{
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const multerMiddleware = multer({
    storage : storage
})

const UserRouter = express.Router()

UserRouter.put('/profile/picture', Authorization(['user', 'admin']), multerMiddleware.single('image'), UpdateProfilePictureController)

module.exports = UserRouter