const express = require("express");

const {AddNewAdventureController, GetAllAdventureByCityName, DeleteAdventureByIdController} = require("./../controller/Adventure.controller")

const {Authorization} = require("./../middlewares/authorization.middleware")

const AdventureRouter = express.Router();

AdventureRouter.post("/add", Authorization(['admin']), AddNewAdventureController); // Protect using token

AdventureRouter.get("/", GetAllAdventureByCityName)

AdventureRouter.delete("/delete", Authorization(['admin']), DeleteAdventureByIdController) // Protect using token

module.exports = AdventureRouter;