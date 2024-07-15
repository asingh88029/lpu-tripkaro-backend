const httpStatus = require("http-status")

const cloudinary = require('cloudinary').v2;

require("dotenv").config()

const fs = require("fs")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  
})

const {UpdateProfilePictureService} = require("./../service/User.service")

async function UpdateProfilePictureController(req, res){
    try{

        const userId = req.id;

        if(!req.file){
            throw new Error("Image File To Upload is missing")
        }

        const {path, size, mimetype} = req.file

        // TODO : To limit the file size
        if(size>625000){ // 5 MB or 62500 BYTE
            const err =  new Error("File size is too large")
            err.path = path
            throw err
        }

        // TODO : Check for the filetype as well
        if(mimetype!=="image/jpeg" && mimetype!=="image/png" && mimetype!=="image/jpg"){
            const err =  new Error("File Type is not supported")
            err.path = path
            throw err
        }

        const result = await cloudinary.uploader.upload(path);

        if(result.secure_url){
            const profileImageURL = result.secure_url
            // UpdateProfilePictureService(userId, profileImageURL)
            const serviceResult = await UpdateProfilePictureService(userId, profileImageURL)

            if(serviceResult.success){

                // TODO :- delete the image from the our server
                if(fs.existsSync(path)){
                    fs.unlinkSync(path)
                }

                res.status(httpStatus.OK).json({
                    success : true
                })

            }else{
                const err = new Error("Error while calling UpdateProfilePictureService in UpdateProfilePictureController")
                err.path = path
                throw err
            }

        }else{
            const err = new Error("Error while getting a secure url from the cloudinary")
            err.path = path
            throw err
        }

        

    }catch(err){
        const path = err.path

        // TODO :- delete the image from the our server
        if(fs.existsSync(path)){
            fs.unlinkSync(path)
        }


        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false
        })
    }
}

module.exports = {
    UpdateProfilePictureController
}