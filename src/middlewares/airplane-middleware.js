const { StatusCodes } = require("http-status-codes");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong while creating airplane",
      data: {},
      error: { explainantion: "Model Number not Found in incoming request" },
    });
  }
  next();
}

module.exports = { validateCreateRequest };
