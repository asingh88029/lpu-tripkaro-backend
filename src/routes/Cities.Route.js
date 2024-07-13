const express = require("express");
const {CreateNewCity, GetAllCity : GetAllCityController, DeleteCityByIdController} = require("./../controller/Cities.controller")
const {Authorization} = require("./../middlewares/authorization.middleware")

const CitiesRouter = express.Router();

CitiesRouter.get("/all", GetAllCityController) // This is generall endpoint, anyone can use it without any token

CitiesRouter.post("/add", Authorization(['admin']), CreateNewCity); // This is a protected endpoint. Token is reqd

CitiesRouter.delete("/delete", Authorization(['admin']), DeleteCityByIdController) // This is a protected endpoint. Token is required

module.exports = CitiesRouter;