const { Sequelize } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort = [["price", "ASC"]]) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Airplane,
          as: "Airplane_Details",
          required: true,
        },
        {
          model: Airport,
          as: "Departure_Airport",
          required: true,
          include: [
            {
              model: City,
              required: true,
            },
          ],
        },
        {
          model: Airport,
          as: "Arrival_Airport",
          required: true,
          include: [
            {
              model: City,
              required: true,
            },
          ],
        },
      ],
    });
    return response;
  }
}

module.exports = FlightRepository;
