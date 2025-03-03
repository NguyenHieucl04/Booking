const express = require("express")
const routerRoom = express.Router();
const controller = require("../../controllers/admin/room.controller")
// [GET] /api/v1/admin/rooms
routerRoom.get("/rooms" , controller.getRoom)
// [POST] /API/V1/ADMIT/CREATE/ROOMS
routerRoom.post("/create/rooms" , controller.addRoom)

module.exports = routerRoom