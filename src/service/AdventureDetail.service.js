const AdventureDetail = require("./../model/AdventureDetails.model")

async function SaveNewAdventureDetailService(adventureId, subtitle, images, content, slots){

    try{

        const result = await AdventureDetail.create({
            adventureId,
            subtitle,
            images, 
            content,
            slots
        })

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("Error inSaveNewAdventureDetailService")
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }

}

async function GetAdventureDetailByAdventureIdService(adventureId){
    try{

        const result = await AdventureDetail.findOne({adventureId : adventureId}).populate('adventureId', 'name costPerHead')

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("Error in GetAdventureDetailByAdventureIdService")
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }
}

module.exports = {
    SaveNewAdventureDetailService,
    GetAdventureDetailByAdventureIdService
}