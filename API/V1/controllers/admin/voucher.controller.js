const voucher = require("../../models/voucher.model");
module.exports.index = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      code: 500,
    });
  }
};
