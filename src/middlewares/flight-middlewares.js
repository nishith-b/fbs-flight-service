const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { DateTimeHelper } = require("../utils/helpers");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Request Body is Empty"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.flightNumber) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Flight number not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.airplaneId) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Airplane Id is not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureAirportId) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["departure airport id is not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Arrival airport id is not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalTime) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Arrival Time is not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureTime) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Departure Time is not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.price) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Price is  not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.totalSeats) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Total Seats are  not Found in incoming request"],
      StatusCodes.BAD_REQUEST
    );
  }
  if (
    !DateTimeHelper.compareTime(req.body.arrivalTime, req.body.departureTime)
  ) {
    ErrorResponse.message = "Something went wrong while creating Flight";
    ErrorResponse.error = new AppError(
      ["Arrival Time must be greater than Departure Time"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = { validateCreateRequest };
