const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
    id : { type : String, required : true},
    city : { type : String, required : true},
    description : { type : String, required : true},
    image : { type : String, required : true},
})

const Cities = mongoose.model("cities", CitySchema)

module.exports = Cities;