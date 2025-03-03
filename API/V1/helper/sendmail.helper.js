const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@gmail.com",
    pass: "yourpassword",
  },
});

module.exports.sendMail = (email, otp) => {
  const mailOptions = {
    from: "youremail@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    text: `Your OTP is ${otp}`,
    html: "<h1>Welcome</h1><p>That was easy!</p>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

/* 
        Đúng vậy, nếu bạn sử dụng Gmail để gửi email từ ứng dụng Node.js của mình, bạn cần thực hiện một số cấu hình trong tài khoản Gmail của bạn để cho phép ứng dụng gửi email. Dưới đây là các bước cần thực hiện:

Bật quyền truy cập của ứng dụng kém an toàn:

Truy cập vào trang quản lý tài khoản Google.
Chọn "Bảo mật" (Security) từ menu bên trái.
Cuộn xuống và tìm mục "Quyền truy cập của ứng dụng kém an toàn" (Less secure app access).
Bật quyền truy cập cho các ứng dụng kém an toàn.
Sử dụng mật khẩu ứng dụng (khuyến nghị):

Truy cập vào trang quản lý tài khoản Google.
Chọn "Bảo mật" (Security) từ menu bên trái.
Trong phần "Đăng nhập vào Google" (Signing in to Google), bật "Xác minh 2 bước" (2-Step Verification).
Sau khi bật xác minh 2 bước, quay lại phần "Đăng nhập vào Google" và chọn "Mật khẩu ứng dụng" (App passwords).
Tạo mật khẩu ứng dụng mới và sử dụng mật khẩu này thay vì mật khẩu tài khoản Google của bạn trong mã nguồn.

*/
