const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { Op } = require("sequelize");
const AppError = require("../utils/errors/app-error");
const { param } = require("../routes");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explainantion = [];
      error.errors.forEach((err) => {
        explainantion.push(err.message);
      });
      throw new AppError(explainantion, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Flight Object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = {};
  if (query.trips) {
    const [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    const [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice === undefined ? 20000 : maxPrice],
    };
  }
  if (query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    if (query.tripDate) {
      customFilter.departureTime = {
        [Op.between]: [
          `${query.tripDate} 00:00:00`,
          `${query.tripDate} 23:59:59`,
        ],
      };
    }
  }
  if (query.sort) {
    const params = query.sort.split(",");
    const sortFilter = package.map((param) => param.split("-"));
    sortFilter = [sortFilters];
  }
  try {
    const flights = await flightRepository.getAllFlights(customFilter);
    return flights;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all Flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
