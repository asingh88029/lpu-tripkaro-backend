const mongoose = require("mongoose")

const ReservationSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref : "tripkaro-users", required : true},
    adventure : {type: mongoose.Schema.Types.ObjectId, ref : "adventures", required : true},
    date : { type : Date, required : true},
    numberOfPerson : { type : Number, required : true},
    bookingCreatedAt : { type : Date, default : Date.now}
})

const Reservation = mongoose.model("tripkaro-reservation", ReservationSchema)

module.exports = Reservation;