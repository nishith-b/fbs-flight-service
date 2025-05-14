"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Airplanes", [
      {
        modelNumber: "airbus400",
        capacity: 900,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "boeing777",
        capacity: 500,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "airbusA380",
        capacity: 853,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "boeing747",
        capacity: 660,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "embraerE190",
        capacity: 114,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "bombardierCS300",
        capacity: 160,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "boeing737",
        capacity: 215,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "airbusA320neo",
        capacity: 194,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "comacC919",
        capacity: 174,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "mc21-300",
        capacity: 211,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Airplanes", null, {});
  },
};
