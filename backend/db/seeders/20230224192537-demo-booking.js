'use strict';

let options = {};
options.tableName = 'Bookings'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: "2021-11-19",
        endDate: "2021-11-21",
      },
      {
        spotId: 1,
        userId: 3,
        startDate: "2022-1-14",
        endDate: "2022-1-18",
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2022-2-12",
        endDate: "2022-2-14",
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2021-4-20",
        endDate: "2021-4-21",
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2023-1-2",
        endDate: "2023-1-10",
      },
      {
        spotId: 3,
        userId: 2,
        startDate: "2022-12-19",
        endDate: "2022-12-24",
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
