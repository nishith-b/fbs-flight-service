const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["Airport Name  not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.code) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["Airport Code not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.cityId) {
    ErrorResponse.message = "Something went wrong while creating airport";
    ErrorResponse.error = new AppError(
      ["Airport CityId is not found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateRequest(req, res, next) {
  if (!req.body) {
    ErrorResponse.message = "Something went wrong while updating airport";
    ErrorResponse.error = new AppError(
      ["Required data not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.name && !req.body.code && !req.body.cityId) {
    ErrorResponse.message = "Something went wrong while updating airport";
    ErrorResponse.error = new AppError(
      ["Required data not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}
module.exports = { validateCreateRequest, validateUpdateRequest };
