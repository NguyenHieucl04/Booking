const express = require("express");
const routerRoom = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const controller = require("../../controllers/admin/room.controller");
const cloudiary = require("../../middlewares/admin/cloudinay.middlewares");
// [GET] /api/v1/admin/rooms
routerRoom.get("/rooms", controller.getRoom);
// [POST] /API/V1/ADMIT/rooms/create
routerRoom.post(
  "/rooms/create",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "imageArray", maxCount: 5 },
  ]),
  cloudiary.cloudFileds,
  controller.addRoom
);

module.exports = routerRoom;
