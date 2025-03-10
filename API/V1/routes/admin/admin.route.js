const express = require("express");
const routerAdmin = express.Router();

const controller = require("../../controllers/admin/admin.controller");
const middleware = require("../../middlewares/admin/admin.middleware");
// [POST] /api/v1/admin/register

routerAdmin.post("/register", controller.register);
// [POST] /api/v1/admin/login
routerAdmin.post("/login", controller.login);

// [GET] /api/v1/admin/account-manage
routerAdmin.get(
  "/account-manage",
  middleware.adminAuthencation,
  controller.index
);
// [PATCH] /api/v1/admin/account-manage/delete/:statusDelete/:idAccount
routerAdmin.patch(
  "/account-manage/delete/:statusDelete/:idAccount",
  middleware.adminAuthencation,
  controller.deleteAccount
);
// [GET] /api/v1/admin/account-manage/edit/:idAccount
routerAdmin.get(
  "/account-manage/edit/:idAccount",
  middleware.adminAuthencation,
  controller.getEdit
);
// [PATCH] /api/v1/admin/account-manage/edit/:idAccount
routerAdmin.patch(
  "/account-manage/edit/:idAccount",
  middleware.adminAuthencation,
  controller.patchEdit
);
module.exports = routerAdmin;
