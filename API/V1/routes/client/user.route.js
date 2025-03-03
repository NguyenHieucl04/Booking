const express = require("express")
const routerUser = express.Router();
const controller = require("../../controllers/client/user.controller")
//[]
routerUser.post("/client/login", controller.login)

// [POST] /api/v1/client/add
routerUser.post("/client/add" , controller.addUser)
module.exports = routerUser