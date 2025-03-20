const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");
module.exports.middleware = async (req, res, next) => {
  try {
    const tokenBeare = req.headers.token;
    const userDataBase = await User.findOne({
      token: tokenBeare,
      deleted: false,
    });
    if (!userDataBase) {
      res.status(400).json({
        message: "Token incorrect!",
        code: 400,
      });
      return;
    }
    req.user = userDataBase;
    let cart;
    if (!req.cookies.cartId) {
      console.log("khong co cartId");
      cart = await createNewCart(userDataBase.id, res);
    } else {
      console.log("co card id");
      cart = await Cart.findOne({
        _id: req.cookies.cartId,
        userId: userDataBase.id,
      });
      if (!cart) {
        console.log("Giỏ hàng không tồn tại, tạo giỏ hàng mới");
        cart = await createNewCart(userDataBase.id, res);
        
      }
      if (cart.products.length > 0) {
        cart.totalProduct = cart.products.reduce((sum, item) => {
          return sum + item.quantity;
        }, 0);
      } else {
        cart.totalProduct = 0;
      }
    }
    // console.log(cart.products.length);
    res.locals.cart = cart;
    next();
  } catch (error) {
    res.json({
      message: "Server error!",
      code: 500,
    });
    return;
  }
};

const createNewCart = async (userId, res) => {
  data = {
    userId: userId,
    products: [],
  };
  const cart = new Cart(data);
  await cart.save();
  const dateCart = 1000 * 60 * 60 * 24 * 180 * 100;
  res.cookie("cartId", cart.id, {
    expires: new Date(Date.now() + dateCart),
    httpOnly: true,
    secure: false, // Chỉ gửi cookie qua kết nối HTTPS
    sameSite: "strict", // Ngăn chặn gửi cookie qua trang khác
  });
  return cart;
};
