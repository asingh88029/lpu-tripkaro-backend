const httpStatus = require("http-status")

const {createNewReservationService, GetReservationsByUserIdService} = require("./../service/Reservation.service")

async function CreateNewAdventureBooking(req, res){
    try{

        const userId = req.id;

        const { id : adventureId } = req.query;

        const {date , numberOfPerson} = req.body;

        if(!adventureId || !date || !numberOfPerson){
            throw new Error("adventureId, date or numberOfPerson is missing")
        }

        const result = await createNewReservationService(userId, adventureId, date, numberOfPerson)

        if(!result.success){
            throw new Error("Error in CreateNewAdventureBooking")
        }

        res.status(httpStatus.CREATED).json({
            success : true,
            data : result.data
        })


    }catch(err){
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false
        })
    }
}

async function GetAllAdventuresBooking(req, res){
    try{

        const userId = req.id;

        const result = await GetReservationsByUserIdService(userId)

        if(!result.success){
            throw new Error("Error in GetAllAdventuresBooking Controller")
        }

        res.status(httpStatus.OK).json({
            success : true,
            data : result.data.map((reservation)=>{
                const {adventure, numberOfPerson, date, bookingCreatedAt, _id : id} = reservation
                return {
                    id,
                    adventureId : adventure,
                    numberOfPerson,
                    date,
                    bookingCreatedAt
                }
            })
        })

    }catch(err){
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false
        })
    }
}

module.exports = {
    CreateNewAdventureBooking,
    GetAllAdventuresBooking
}