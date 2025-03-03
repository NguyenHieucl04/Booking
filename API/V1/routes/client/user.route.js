const express = require("express");
const routerUser = express.Router();
const controller = require("../../controllers/client/user.controller");
//[]
routerUser.post("/client/login", controller.login);

// [POST] /api/v1/client/add
routerUser.post("/client/login/create", controller.addUser);

// [POST] /api/v1/client/password/forgot
routerUser.post("/client/password/forgot", controller.forgotPassword);
module.exports = routerUser;
