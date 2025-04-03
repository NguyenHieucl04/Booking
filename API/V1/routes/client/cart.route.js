const express = require("express");
const cartRouter = express.Router();
const controller = require("../../controllers/client/cart.controller");

//[GET] /api/v1/client/cart
cartRouter.get("/", controller.getCart);

//[POST] /api/v1/client/cart/add/:roomId
cartRouter.post("/add/:roomId", controller.addCartProduct);
//[GET] /api/v1/client/cart/delete/:roomId
cartRouter.get("/delete/:roomId", controller.deleteRoomOfCart);

//[PATCH] /api/v1/cart/change/:roomId
cartRouter.patch("/change/:roomId", controller.changeQuantity);

//[POST] /api/v1/cart/checkout
cartRouter.post("/checkout", controller.checkout);
<<<<<<< HEAD
// cartRouter.post("/order", controller.order)
=======
// [POST] /api/v1/cart/checkout/order
cartRouter.post("/checkout/order", controller.postOrder);
>>>>>>> nhanh-cart
module.exports = cartRouter;
