const md5 = require("md5");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot.password.model");
const randomOtp = require("../../helper/create.otp");
const { sendMail } = require("../../helper/sendmail.helper");
// [POST] /api/v1/client/login
module.exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const existEmail = await User.findOne({ deleted: false, email: email });
    if (!existEmail) {
      console.log("email not exist!");
      res.status(400).json({
        message: "email not exist!",
        code: 400,
      });
      return;
    }
    if (md5(password) !== existEmail.password) {
      res.status(400).json({
        message: "Incorrect password!",
        code: 400,
      });
      return;
    }
    res.cookie("token", existEmail.token);
    res.json({
      message: "Login successful!",
      code: 200,
      token: existEmail.token,
    });
  } catch (error) {
    res.json({
      message: "Server error!",
      code: 500,
    });
  }
};

// [POST] /api/v1/client/resigter
module.exports.addUser = async (req, res) => {
  try {
    const email = req.body.email;

    const existEmail = await User.findOne({ deleted: false, email: email });
    if (existEmail) {
      res.status(400).json({
        message: "Email already exists!",
        code: 400,
      });
      return;
    }
    let password = req.body.password;
    const passwordconfirm = req.body.passwordconfirm;
    if (password !== passwordconfirm) {
      res.status(400).json({
        message: "Password and Confirm Password are not the same!",
        code: 400,
      });
      return;
    }
    data = {
      email: email,
      password: md5(password),
    };

    const clientNew = new User(data);
    await clientNew.save();
    res.cookie("token", clientNew.token);

    res.json({
      message: "Create Sucessful!",
      code: 200,
    });
  } catch (error) {
    res.json({
      message: "Server error!",
      code: 500,
    });
  }
};

// [POST] /api/v1/client/password/forgot
module.exports.forgotPassword = async (req, res) => {
  try {
    // Người dùng sẽ gửi lên tài khoản email của mình ta sẽ check xem email đó có tồn tại trong db không
    const email = req.body.email;
    const existEmail = await User.findOne({ deleted: false, email: email });
    if (!existEmail) {
      res.status(400).json({
        message: "Email not exist!",
        code: 400,
      });
      return;
    }
    // Nếu email tồn tại thì ta sẽ gửi email thông báo cho người dùng và gửi kèm theo mã otp
    // Gửi mã otp qua email
    const data = {
      email: email,
      otp: randomOtp.ramdomOtp(6),
    };

    const otpAuthen = ForgotPassword(data);
    sendMail(email, data.otp);
    await otpAuthen.save();
    res.json({
      message: "Success!",
      code: 1,
      data: data,
    });
  } catch (error) {
    res.json({
      message: "Server error!",
      code: 500,
    });
  }
};
// [POST] /api/v1/client/password/otp
module.exports.checkOtp = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;
    const user = await User.findOne({ deleted: false, email: email });
    const existOtp = await ForgotPassword.findOne({ email: email, otp: otp });
    if (!existOtp) {
      res.status(400).json({
        message: "OTP incorrect!",
        code: 400,
      });
      return;
    }
    res.cookie("token", user.token);
    res.json({
      message: "OTP correct!",
      code: 200,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error!",
      code: 500,
    });
  }
};
// [PATCH] /api/v1/client/password/rest
module.exports.resetPassword = async (req, res) => {
  try {
    let password = req.body.password;
    const passwordconfirm = req.body.passwordconfirm;
    if (req.user.password === md5(password)) {
      res.json({
        message: "Password incorrect!",
        code: 400,
      });
      return;
    }
    if (password !== passwordconfirm) {
      res.json({
        message: "Password and Confirm Password are not the same!",
        code: 400,
      });
      return;
    }
    await User.updateOne(
      {
        token: req.user.token,
        deleted: false,
      },
      {
        password: md5(password),
      }
    );
    res.json({
      message: "Reset password successful!",
      code: 200,
    });
  } catch (error) {
    res.json({
      message: "Server error!",
      code: 500,
    });
  }
};

// [GET] /api/v1/client/logout
module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      message: "Logout successful!",
      code: 200,
    });
  } catch (error) {
    res.json({
      message: "Server error!",
      code: 500,
    });
  }
};
