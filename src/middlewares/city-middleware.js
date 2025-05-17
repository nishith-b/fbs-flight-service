const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body || !req.body.name) {
    ErrorResponse.message = "Something went wrong while creating City";
    ErrorResponse.error = new AppError(
      ["City name not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateUpdateRequest(req, res, next) {
  if (!req.body) {
    ErrorResponse.message = "Something went wrong while updating city";
    ErrorResponse.error = new AppError(
      ["Required data not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while updating city";
    ErrorResponse.error = new AppError(
      ["Required data not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = { validateCreateRequest, validateUpdateRequest };
