const User = require("./../model/User.model")

async function RegisterUserService(name, email, encryptedPassword){
    try{

        const result = await User.create({
            name,
            email,
            password : encryptedPassword
        })

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("Error in RegisterUserService")
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }
}

async function GetUserByEmailId(email){
    try{
        const result = await User.findOne({email : email})

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("Error in GetUserByEmailId")
        }
    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }
}

async function UpdateProfilePictureService(userId, profileImageURL){
    try{

        const user = await User.findOne({_id : userId})

        if(!user){
            throw new Error("User not found while executing UpdateProfilePictureService")
        }

        user.profileImage = profileImageURL;

        await user.save()

        return {
            success : true
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }
}

module.exports = {
    RegisterUserService,
    GetUserByEmailId,
    UpdateProfilePictureService
}