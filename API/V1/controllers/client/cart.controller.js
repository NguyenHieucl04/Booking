const Cart = require("../../models/cart.model");
const Room = require("../../models/rooms.model");
const priceHelper = require("../../helper/price.helper");
//[GET] /api/v1/client/cart
module.exports.getCart = async (req, res) => {
  try {
    const roomCart = res.locals.cart.products;
    data = [];
    for (const item of roomCart) {
      const room = await Room.findOne({ deleted: false, _id: item.product_id });
      const roomNew = priceHelper.priceItem(room);

      const objectRoom = {
        id: roomNew.id,
        priceNew: roomNew.newPrice,
        price: roomNew.price,
        title: roomNew.nameRoom,
        numberRoom: roomNew.numberRoom,
        capacity: roomNew.capacity,
        discountPersent: roomNew.discountPersent,
        quantity: item.quantity,
        thumbnail: roomNew.thumbnail[0],
        floor: roomNew.floor,
        windowView: roomNew.windowView,
      };
      data.push(objectRoom);
    }
    return res.status(200).json({
      message: "Successfully!",
      code: 200,
      data: data,
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
    // console.log(checkCart);
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

//[POST] /api/v1/cart/checkout

module.exports.checkout = async (req, res) => {
  try {
    const id_and_method = req.body.methodandid;
    const cartId = req.cookies.cardId;
    let cartCheckOut = [];
    // TH1: Khách hàng ấn đặt phòng ở giao diện chi tiết của phòng
    if (id_and_method[1] === "placenow") {
      id_and_method.splice(1, 1);
      const [id] = id_and_method;
      const room = await Room.findOne({ _id: id, deleted: false });

      if (!room) {
        return res.status(404).json({ message: "Room not found!", code: 404 });
      }
      const cart = res.locals.cart;
      const checkCart = cart.products.find((item) => item.product_id === id);
      if (checkCart) {
        await Cart.updateOne(
          { _id: cartId, "products.product_id": id },
          {
            $set: {
              "products.$.quantity": parseInt(req.body.quantity),
            },
          }
        );
      } else {
        const data = {
          product_id: id,
          quantity: parseInt(req.body.quantity),
        };

        await Cart.updateOne(
          { _id: cartId },
          {
            $push: { products: data },
          }
        );
      }
      // Chuẩn bị dữ liệu checkout cho sản phẩm "Đặt phòng ngay"
      const roomNew = priceHelper.priceItem(room);
      cartCheckOut.push({
        product_id: id,
        quantity: parseInt(req.body.quantity),
        newPrice: roomNew.newPrice,
        price: roomNew.price,
        discountPersent: roomNew.discountPersent,
        thumbnail: roomNew.thumbnail,
        title: roomNew.nameRoom,
        totalPrice: roomNew.newPrice * parseInt(req.body.quantity),
      });
    }

    // TH2: Khách hàng chọn các phòng muốn đặt ở giao diện giỏ hàng
    else {
      const cart = res.locals.cart;

      for (const idRoom of id_and_method) {
        const roomInfo = await Room.findOne({ _id: idRoom, deleted: false });
        // console.log(productInfo);
        if (!roomInfo) {
          return res
            .status(404)
            .json({ message: `Room with ID ${idRoom} not found!`, code: 404 });
        }
        const roomNew = priceHelper.priceItem(roomInfo);
        const productInCart = cart.products.find(
          (item) => item.product_id === idRoom
        );
        if (productInCart) {
          cartCheckOut.push({
            product_id: idRoom,
            quantity: productInCart.quantity,
            newPrice: roomNew.newPrice,
            price: roomNew.price,
            discountPersent: roomNew.discountPersent,
            thumbnail: roomNew.thumbnail,
            title: roomNew.nameRoom,
            totalPrice: roomNew.newPrice * productInCart.quantity,
          });
        }
      }
    }
    const allPricePay = cartCheckOut.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );
    const allPriceDiscount = cartCheckOut.reduce((sum, item) => {
      return sum + item.price * (item.discountPersent / 100) * item.quantity;
    }, 0);

    return res.status(200).json({
      message: "Checkout successfully!",
      code: 200,
      data: {
        cartCheckOut,
        allPricePay,
        allPriceDiscount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};
