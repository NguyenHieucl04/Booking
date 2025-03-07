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
// [PATCH] /api/v1/admin/rooms/edit
routerRoom.patch(
  "/rooms/edit/:idRoom",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "imageArray", maxCount: 5 },
  ]),
  cloudiary.cloudFileds,
  controller.editRoom
);
// [PATCH] /api/v1/admin/rooms/delete/:idRoom
routerRoom.patch("/rooms/delete/:idRoom", controller.deleteRoom);
// [PATCH] /api/v1/admin/rooms/change-status/:idRoom
routerRoom.patch("/rooms/change-status/:idRoom", controller.changeStatusRoom);

// BIN
//[GET] /api/v1/admin/rooms-delete
routerRoom.get("/rooms-delete", controller.roomDelete);

// [PATCH] /api/v1/admin/rooms/undelete/:idRoom
routerRoom.patch("/rooms/undelete/:idRoom", controller.undelete);
// END BIN
module.exports = routerRoom;
