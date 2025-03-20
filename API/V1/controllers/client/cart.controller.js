const Cart = require("../../models/cart.model");
const Room = require("../../models/rooms.model");
//[GET] /api/v1/client/cart
module.exports.getCart = async (req, res) => {
  try {
    const roomCart = res.locals.cart.products;
    console.log(roomCart);
    return res.status(200).json({
      message: "Successfully!",
      code: 200,
      data: 1,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: 500 });
  }
};
//[POST] /api/v1/client/cart/add/:roomId
module.exports.addCartProduct = async (req, res) => {
  try {
    const id = req.params.roomId;

    const cart_id = req.cookies.cartId;
    const quantity = parseInt(req.body.quantity);
    
    // Kiểm tra số lượng hợp lệ
    if (!quantity || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0!", code: 400 });
    }
    const room = await Room.findOne({ deleted: false, _id: id });
    if (!room) {
      return res.status(404).json({ message: "Room not found!", code: 404 });
    }
    const checkCart = res.locals.cart.products.find(
      (item) => item.product_id === id
    );
    console.log(checkCart);
    if (checkCart) {
      await Cart.updateOne(
        { _id: cart_id, userId: req.user.id, "products.product_id": id },
        {
          $set: {
            "products.$.quantity": checkCart.quantity + parseInt(quantity),
          },
        }
      );
    } else {
      const roomQuantity = {
        product_id: id,
        quantity: quantity,
      };
      await Cart.updateOne(
        { _id: cart_id, userId: req.user.id },
        {
          $push: { products: roomQuantity },
        }
      );
    }
    return res
      .status(200)
      .json({ message: "Add room to cart successfully!", code: 200 });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: 500 });
  }
};

//[GET] /api/v1/client/cart/delete/:roomId
module.exports.deleteRoomOfCart = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findOne({ deleted: false, _id: roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found!", code: 404 });
    }
    const cart_id = req.cookies.cartId;
    await Cart.updateOne(
      { _id: cart_id },
      {
        $pull: {
          products: { product_id: roomId },
        },
      }
    );
    return res.status(200).json({
      message: "Successfully!",
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: 500 });
  }
};

//[POST] /api/v1/cart/change/:roomId
module.exports.changeQuantity = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findOne({ deleted: false, _id: roomId });
    if (!room) {
      return res.status(404).json({ message: "Room not found!", code: 404 });
    }
    const newQuantity = parseInt(req.body.quantity);
    if (!newQuantity || newQuantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0!", code: 400 });
    }
    const cart_id = req.cookies.cartId;
    await Cart.updateOne(
      { _id: cart_id, "products.product_id": roomId },
      {
        $set: { "products.$.quantity": newQuantity },
      }
    );
    return res.status(200).json({
      message: "Update Successfully!",
      code: 200,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, code: 500 });
  }
};
