const express = require("express");
const routerVoucher = express.Router();
const controller = require("../../controllers/admin/voucher.controller");

//[GET] /api/v1/admin/vouchers
routerVoucher.get("/", controller.index);

module.exports = routerVoucher;
