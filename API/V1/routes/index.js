// const express = require("express")
// // const router = express.Router();
const Rooms = require("../models/rooms.model");
// [GET] /API/V1/ROOMS
module.exports = (app) => {
    app.get("api/v1/rooms" , async (req, res) => {
        const data = await Rooms.find({
            deleted: "false"
        })
    
        res.json({
            message : "Truy cap du lieu thanh cong!",
            data : data
            
        })
    })
}