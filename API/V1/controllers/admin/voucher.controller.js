const voucher = require("../../models/voucher.model");
module.exports.index = async (req, res) => {
  try {
    // lấy ra danh sách voucher
    // lấy ra danh sách voucher
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};
