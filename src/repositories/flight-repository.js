const { Sequelize } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const db = require("../models");
const { addRowLockOnFlights } = require("./queries");

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

  async updateRemainingSeats(flightId, seats, dec = true) {
    // Add row lock for this operation(useful when multiple requests come for single object)
    console.log("Inside")
    const transaction = await db.sequelize.transaction();
    try {
      await db.sequelize.query(addRowLockOnFlights(flightId));
      const flight = await Flight.findByPk(flightId);
      if (+dec) {
        await flight.decrement(
          "totalSeats",
          { by: seats },
          { transaction: transaction }
        );
      } else {
        await flight.increment(
          "totalSeats",
          { by: seats },
          { transaction: transaction }
        );
      }
      await transaction.commit();
      return flight;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = FlightRepository;
