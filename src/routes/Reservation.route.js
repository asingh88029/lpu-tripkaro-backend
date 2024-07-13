const express = require("express")

const ReservationRouter = express.Router()

const {Authorization} = require("./../middlewares/authorization.middleware")

const {CreateNewAdventureBooking, GetAllAdventuresBooking} = require("./../controller/Reservation.controller")

ReservationRouter.post("/new", Authorization(['user']), CreateNewAdventureBooking)

ReservationRouter.get("/all", Authorization(['user']), GetAllAdventuresBooking)

module.exports = ReservationRouter