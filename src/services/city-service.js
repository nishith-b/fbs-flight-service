const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explainantion = [];
      error.errors.forEach((err) => {
        explainantion.push(err.message);
      });
      throw new AppError(explainantion, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create a new City",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCity,
};
