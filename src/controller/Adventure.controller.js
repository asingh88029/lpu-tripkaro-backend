const httpStatus = require("http-status");

const {SaveDataInAdventures, GetAdventuresByCityService, DeleteAdventureByIdService} = require("./../service/Adventures.service")

async function AddNewAdventureController(req, res){
    try{

        // We have to extract the information from the body

        const {cityId, name, costPerHead, duration, category, image, currency} = req.body;

        const result = await SaveDataInAdventures(cityId, name, costPerHead, duration, image, currency, category);

        if(result.success){
            res.status(httpStatus.CREATED).json({
                success : true,
                data : result.data
            })
        }else{
            throw new Error("Error in AddNewAdventureController")
        }


    }catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false
        })
    }
}

async function GetAllAdventureByCityName(req, res){
    try{

        const city = req.query.city.toLowerCase()

        const result = await GetAdventuresByCityService(city)

        if(result.success){
            res.status(httpStatus.OK).json({
                success : true,
                data : result.data
            })
        }else{
            throw new Error("Error in GetAllAdventureByCityName Controller")
        }

    }catch(err){
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false
        })
    }
}

async function DeleteAdventureByIdController(req, res){
    try{

        const {id} = req.query;

        const result = await DeleteAdventureByIdService(id)

        if(result.success){
            res.status(httpStatus.OK).json({
                status : true
            })
        }else{
            throw new Error("Error in DeleteAdventureByIdController")
        }

    }catch(err){
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false
        }) 
    }
}

module.exports = {
    AddNewAdventureController,
    GetAllAdventureByCityName,
    DeleteAdventureByIdController
}