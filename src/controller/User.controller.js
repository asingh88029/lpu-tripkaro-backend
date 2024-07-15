const httpStatus = require("http-status")

async function UpdateProfilePictureController(req, res){
    try{

        const userId = req.id;

        if(!req.file){
            throw new Error("Image File To Upload is missing")
        }

        const {path, size, mimetype} = req.file

        // TODO : To limit the file size
        if(size>625000){ // 5 MB or 62500 BYTE
            throw new Error("File size is too large")
        }

        // TODO : Check for the filetype as well
        if(mimetype!=="image/jpeg" && mimetype!=="image/png" && mimetype!=="image/jpg"){
            throw new Error("File Type is not supported")
        }

        

    }catch(err){
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false
        })
    }
}

module.exports = {
    UpdateProfilePictureController
}