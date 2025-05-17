const { StatusCodes } = require("http-status-codes");

const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
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

async function destroyCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The City you requested to delete is not found!",
        error.statusCode
      );
    }
    throw new AppError(
      "Cannot delete data of given city",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}



module.exports = {
  createCity,
  destroyCity,
};
