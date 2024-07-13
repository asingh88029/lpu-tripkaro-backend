const httpStatus = require("http-status")

const { SaveNewAdventureDetailService, GetAdventureDetailByAdventureIdService } = require("./../service/AdventureDetail.service")

async function SaveNewAdventureDetail(req, res){

    try{

        const { id : adventureId } = req.query

        const { subtitle, images, content, slots} = req.body

        const modifiedDateSlots = slots.map((slot)=>{
            if(slot.date){
                
                // Split the input date string into day, month, and year
                const [day, month, year] = slot.date.split('-').map(Number);

                // Create a new Date object with the specified date
                const date = new Date(Date.UTC(year, month - 1, day));

                const newSlot = {...slot, date : date}

                return newSlot

            }
        })

        const result = await SaveNewAdventureDetailService(adventureId, subtitle, images, content, modifiedDateSlots)

        if(result.success){

            res.status(httpStatus.CREATED).json({
                success : true,
                data : result.data
            })

        }else{
            throw new Error("Error in SaveNewAdventureDetail Controler")
        }

    }catch(err){
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false
        })
    }

}

async function GetAdventureDetailsUsingAdventureIdController(req, res){
    try{

        const { id : adventureId } = req.query;

        const result = await GetAdventureDetailByAdventureIdService(adventureId)

        if(result.success){

            const {adventureId : {name, costPerHead}, subtitle, images, content, available, reserved, slots} = result.data

            const DATA_TO_SEND = {
                id : adventureId,
                name,
                costPerHead,
                subtitle,
                images,
                content,
                available,
                reserved,
                slots : slots.map(slot=>{
                    return {
                        date : slot.date,
                        numberOfPerson : slot.numberOfPerson
                    }
                })
            }

            res.status(httpStatus.OK).json({
                success : true,
                data : DATA_TO_SEND
            })

        }else{
            throw new Error("Error in GetAdventureDetailsUsingAdventureIdController")
        }

    }catch(err){
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false
        })
    }
}

module.exports = {
    SaveNewAdventureDetail,
    GetAdventureDetailsUsingAdventureIdController
}