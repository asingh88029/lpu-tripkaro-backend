const mongoose = require("mongoose");

const AdventureSchema = new mongoose.Schema({
    cityId : {type : mongoose.Schema.Types.ObjectId, rel : "cities", required : true},
    name : {type : String, required : true},
    costPerHead : {type : Number, required : true},
    currency : {type : String, required : true},
    image : {type : String, required : true},
    duration : {type : Number, required : true},
    category : {type : String, required : true}
})

const Adventures = mongoose.model("adventures", AdventureSchema)

module.exports = Adventures;