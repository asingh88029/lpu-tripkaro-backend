const express = require("express")
require("dotenv").config()
require("./src/db/connect");
const cors = require('cors')

const fs = require("fs")

const CitiesRouter = require("./src/routes/Cities.Route");
const AdventureRouter = require("./src/routes/Adventures.Route");
const AdventureDetailRouter = require("./src/routes/AdventureDetails.router");
const AuthRouter = require("./src/routes/Auth.Route");
const ReservationRouter = require("./src/routes/Reservation.route")
const UserRouter = require("./src/routes/User.router")

const PORT = process.env.PORT

const server = express()

server.use(cors())

server.use(express.json())

// fs.watch("data/students.txt", (eventType, fileName)=>{
//     console.log(fileName, " is changed")
//     console.log(eventType)
// })

// server.get('/testing', async (req, res)=>{
   
//     try{

//         // TODO 1 : Create a folder/directory
//         // fs.mkdirSync("data")

//         // fs.mkdir('images/birthday/cake_cutting', {recursive : true}, (err)=>{
//         //     if(err){
//         //         throw new Error("Error while creating folder")
//         //     }
//         //     console.log("folder created successfully")
//         //     res.send({
//         //         success : true
//         //     })    
//         // })

//         // TODO 2 : Create a file

//         // await fs.writeFileSync("data/students.txt", "Dipesh Raj", 'utf-8')

//         // fs.writeFile("data/projects.txt", "tripkaro.in", 'utf-8', (err)=>{
//         //     if(err){
//         //         throw new Error("Error while creating file")
//         //     }
//         //     res.send({
//         //         success : true
//         //     })
//         // })

//         // TODO 3 : Update a file

//         // fs.appendFileSync("data/students.txt", "\nDivyansh Kumar", "utf-8")

//         // await fs.appendFileSync("data/topics.txt", "React\n", "utf-8")

//         // TODO 4 : Read a file

//         // const result = await fs.readFileSync("data/students.txt", "utf-8")

//         // console.log(result)

//         // TODO 5 : Read a directory

//         // const files = fs.readdirSync("data")

//         // console.log(files)

//         // files.forEach((name)=>{
//         //     const result = fs.readFileSync(`data/${name}`, "utf-8")
//         //     console.log(result)     
//         // })

//         // TODO 6 : To check the existence of a file or folder

//         // if(fs.existsSync("data/projects.txt")){
           

//         //     // TODO 7 : Delete a file

//         //     fs.unlinkSync("data/projects.txt")

//         // }

//         // TODO 8 : Rename File or Folder

//         // fs.renameSync("uploads", "old_uploads")

//         fs.renameSync("data/topics.txt", "data/frontend_topics.txt")

//         res.send({
//             success : true
//         })  

//     }catch(err){
//         console.log(err)
//         res.send({
//             success : false
//         })
//     }

// })

server.use("/api/v1/cities", CitiesRouter)

server.use("/api/v1/adventures", AdventureRouter)

server.use('/api/v1/details', AdventureDetailRouter)

server.use('/api/v1/auth', AuthRouter)

server.use('/api/v1/user/', UserRouter)

server.use('/api/v1/reservations', ReservationRouter)

server.listen(PORT, ()=>{
    console.log("Express.js server is started on PORT : ", PORT)
})
