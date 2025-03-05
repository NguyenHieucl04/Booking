const express = require("express");
const routerUser = express.Router();
const controller = require("../../controllers/client/user.controller");
const middleware = require("../../middlewares/client/index.middlewars");
//[]
routerUser.post("/client/login", controller.login);

// [POST] /api/v1/client/add
routerUser.post("/client/register", controller.addUser);

// [POST] /api/v1/client/password/forgot
routerUser.post("/client/password/forgot", controller.forgotPassword);
// [POST] /api/v1/client/password/otp
routerUser.post("/client/password/otp", controller.checkOtp);
// [POST] /api/v1/client/password/rest
routerUser.patch(
  "/client/password/rest",
  middleware.middleware,
  controller.resetPassword
);
// [GET] /api/v1/client/logout
routerUser.get("/client/logout", controller.logout);
module.exports = routerUser;
