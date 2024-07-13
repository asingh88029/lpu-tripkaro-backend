const express = require("express")
require("dotenv").config()
require("./src/db/connect");
const cors = require('cors')

const CitiesRouter = require("./src/routes/Cities.Route");
const AdventureRouter = require("./src/routes/Adventures.Route");
const AdventureDetailRouter = require("./src/routes/AdventureDetails.router");
const AuthRouter = require("./src/routes/Auth.Route");
const ReservationRouter = require("./src/routes/Reservation.route")

const PORT = process.env.PORT

const server = express()

server.use(cors())

server.use(express.json())

server.use("/api/v1/cities", CitiesRouter)

server.use("/api/v1/adventures", AdventureRouter)

server.use('/api/v1/details', AdventureDetailRouter)

server.use('/api/v1/auth', AuthRouter)

server.use('/api/v1/reservations', ReservationRouter)

server.listen(PORT, ()=>{
    console.log("Express.js server is started on PORT : ", PORT)
})
