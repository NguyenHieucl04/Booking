const md5 = require("md5");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot.password.model");
const randomOtp = require("../../helper/create.otp");
const { sendMail } = require("../../helper/sendmail.helper");
// [POST] /api/v1/client/login
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const existEmail = await User.findOne({ deleted: false, email: email });
  if (!existEmail) {
    console.log("email not exist!");
    res.json({
      message: "email not exist!",
      code: 3,
    });
    return;
  }
  if (md5(password) !== existEmail.password) {
    res.json({
      message: "Incorrect password!",
      code: 4,
    });
    return;
  }
  res.json({
    message: "Login successful!",
    code: 1,
    token: existEmail.token,
  });
};

// [POST] /api/v1/client/login/create
module.exports.addUser = async (req, res) => {
  const email = req.body.email;

  const existEmail = await User.findOne({ deleted: false, email: email });
  if (existEmail) {
    res.json({
      message: "Email already exists!",
      code: 2,
    });
    return;
  }
  let password = req.body.password;
  const passwordconfirm = req.body.passwordconfirm;
  if (password !== passwordconfirm) {
    res.json({
      message: "Password and Confirm Password are not the same!",
      code: 2,
    });
    return;
  }
  data = {
    email: email,
    password: md5(password),
  };

  const clientNew = new User(data);
  await clientNew.save();

  res.json({
    message: "Create Sucessful!",
    code: 1,
  });
};

// [POST] /api/v1/client/password/forgot
module.exports.forgotPassword = async (req, res) => {
  // Người dùng sẽ gửi lên tài khoản email của mình ta sẽ check xem email đó có tồn tại trong db không
  const email = req.body.email;
  const existEmail = await User.findOne({ deleted: false, email: email });
  if (!existEmail) {
    res.json({
      message: "Email not exist!",
      code: 3,
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
};
