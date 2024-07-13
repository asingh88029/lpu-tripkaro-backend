const express = require("express");

const { SaveNewAdventureDetail, GetAdventureDetailsUsingAdventureIdController } = require("./../controller/AdventureDetails.controller")

const {Authorization} = require("./../middlewares/authorization.middleware")

const AdventureDetailRouter = express.Router()

AdventureDetailRouter.post('/add', Authorization(['admin']), SaveNewAdventureDetail)

AdventureDetailRouter.get("/", GetAdventureDetailsUsingAdventureIdController)

module.exports = AdventureDetailRouter;