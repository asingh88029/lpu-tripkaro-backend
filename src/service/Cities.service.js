const Cities = require("./../model/Cities.model");

async function SaveNewDataInCities(id, city, description, image){
    try{

        const result = await Cities.create({
            id,
            city,
            description,
            image
        })

        console.log(result)

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("Error while saving data in cities")
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }
}

async function GetAllCity(){
    try{

      const result =  await Cities.find()

      if(result){
        return {
            success : true,
            data : result
        }
      }else{
        throw new Error("Error inside the GetAllCity Service")
      }

    }catch(err){
        console.log(err)
        return {
            success : false
        } 
    }
}

async function DeleteCityById(_id){
    try{

       const result = await Cities.findByIdAndDelete(_id)

       if(result){
            return {
                success : true,
                data : result
            }
       }else{
            throw new Error("Error in DeleteCityById Service")
       }

    }catch(err){
        console.log(err)
        return {
            success : false
        } 
    }
}

module.exports = {
    SaveNewDataInCities,
    GetAllCity,
    DeleteCityById
}