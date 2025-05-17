const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Something went wrong while creating airplane";
    ErrorResponse.error = new AppError(
      ["Model Number not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.capacity) {
    ErrorResponse.message = "Something went wrong while creating airplane";
    ErrorResponse.error = new AppError(
      ["Capacity in not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateRequest(req, res, next) {
  if (!req.body) {
    ErrorResponse.message = "Something went wrong while updating airplane";
    ErrorResponse.error = new AppError(
      ["Required data not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.modelNumber && !req.body.capacity) {
    ErrorResponse.message = "Something went wrong while updating airplane";
    ErrorResponse.error = new AppError(
      ["Required data not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}
module.exports = { validateCreateRequest, validateUpdateRequest };
