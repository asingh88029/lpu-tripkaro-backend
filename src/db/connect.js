const mongoose = require("mongoose");
require("dotenv").config()

const MONGODB_CONN_STRING = process.env.MONGODB_URI;

mongoose.connect(MONGODB_CONN_STRING).then(()=>{
    console.log("MONGODB is connected successfully!")
})