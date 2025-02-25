const mongoose = require("mongoose")
require("dotenv").config();
module.exports.dataConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/project_1");
        console.log("CONNECT SUCESS!")
        
    } catch (error) {
        console.log("CONNECT ERROR" , error)
    }
}