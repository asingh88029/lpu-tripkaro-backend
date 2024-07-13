const Adventures = require("./../model/Adventures.model")
const Cities = require("./../model/Cities.model")

async function SaveDataInAdventures(cityId, name, costPerHead, duration, image, currency, category){

    try{

        const result = await Adventures.create({
            cityId,
            name,
            costPerHead,
            currency,
            image,
            duration,
            category
        })

        if(result) {
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("Error in SaveDataInAdventures")
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }

}

async function GetAdventuresByCityService(cityName){
    try{

        // cityName : punjab
        // fetch the _id of city using the cityName
        const cityResult = await Cities.findOne({id : cityName})

        if(!cityResult){
            throw new Error(`${cityName} is not available in the cities`)
        }

        const {_id : cityId} = cityResult

        // fetch all the adventures

        const adventureResult = await Adventures.find({cityId : cityId})

        if(adventureResult){
            return {
                success : true,
                data : adventureResult
            }
        }else{
            throw new Error("Unable to fetch the adventure using cityId :" + cityId)
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }
}

async function DeleteAdventureByIdService(id){
    try{

        const result = await Adventures.findByIdAndDelete(id)

        if(result){
            return {
                success : true
            }
        }else{
            throw new Error("Error in DeleteAdventureByIdService")
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }
}

module.exports = {
    SaveDataInAdventures,
    GetAdventuresByCityService,
    DeleteAdventureByIdService
}