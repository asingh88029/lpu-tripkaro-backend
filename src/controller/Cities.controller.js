const {SaveNewDataInCities, GetAllCity : GetAllCityService, DeleteCityById : DeleteCityByIdService} = require("./../service/Cities.service")

async function CreateNewCity(req, res){

    try{

        const {city, description, image} = req.body;
        const id = city.toLowerCase()
        const result = await SaveNewDataInCities(id, city, description, image)

        if(result.success){
            res.status(201).json({
                success : true,
                data : result.data
            })
        }else{
            throw new Error("Error while calling CreateNewCity Controller")
        }

    }catch(err){
        res.status(500).json({
            success : false
        })
    }

}

async function GetAllCity(req, res){

    try{

        const result = await GetAllCityService()

        if(result.success){
            res.status(200).json({
                success : true,
                data : result.data
            })
        }else{
            throw new Error("Error in GetAllCity Controller")
        }

    }catch(err){
        res.status(500).json({
            success : false
        })
    }
}

async function DeleteCityByIdController(req, res){
    try{

        const {id} = req.query;

        const result = await DeleteCityByIdService(id)

        if(result.success){
            res.status(200).json({
                success : true,
                data : result.data
            })
        }else{
            throw new Error("Error in DeleteCityByIdController Controller")
        }

    }catch(err){
        res.status(500).json({
            success : false
        })
    }
}

module.exports = {
    CreateNewCity,
    GetAllCity,
    DeleteCityByIdController
}