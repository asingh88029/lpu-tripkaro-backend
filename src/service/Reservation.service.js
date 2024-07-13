const Reservation = require("./../model/Reservation.model")
const AdventureDetails = require("./../model/AdventureDetails.model")

async function createNewReservationService(userId, adventureId, date, numberOfPerson){
    try{
        // We have to check booking is available or not - date & numberOfPerson in adventure with adventureId
        const adventureDetails = await AdventureDetails.findOne({adventureId : adventureId})

        if(!adventureDetails){
            throw new Error("Adventure detail not found")
        }

        // Split the input date string into day, month, and year
        const [day, month, year] = date.split('-').map(Number);

        // Create a new Date object with the specified date
        const modifiedDate = new Date(Date.UTC(year, month - 1, day));

        const slotIndex = adventureDetails.slots.findIndex((slot)=>{
            return slot.date.getTime()==modifiedDate.getTime() && slot.numberOfPerson >= numberOfPerson
        })

        if(slotIndex===-1){
            throw new Error("Slot is not available")
        }

        // We will reduce the slots from adventureDetails

        adventureDetails.slots[slotIndex].numberOfPerson-=numberOfPerson
        if(adventureDetails.slots[slotIndex].numberOfPerson===0){
            adventureDetails.slots.splice(slotIndex, 1)
        }

        if(adventureDetails.slots.length===0){
            adventureDetails.reserved = true;
            adventureDetails.available = false;
        }

        await adventureDetails.save()

        // We will save the booking data inside the tripkaro-reservation collection

        const reservationResult = await Reservation.create({
            date : modifiedDate,
            user : userId,
            adventure : adventureId,
            numberOfPerson : numberOfPerson
        })

        if(!reservationResult){
            throw new Error("Booking Failed")
        }else{
            return {
                success : true,
                data : reservationResult
            }
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }
}

async function GetReservationsByUserIdService(userId){
    try{

        const result = await Reservation.find({user : userId})

        if(result){
            return {
                success : true,
                data : result
            }
        }else{
            throw new Error("Error in GetReservationsByUserIdService")
        }

    }catch(err){
        console.log(err)
        return {
            success : false
        }
    }
}

module.exports = {
    createNewReservationService,
    GetReservationsByUserIdService
}