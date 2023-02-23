'use strict';

let options = {};
options.tableName = 'ReviewImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: "fakeURL"
    },
    {
      reviewId: 1,
      url: "mehURL"
    },
    {
      reviewId: 2,
      url: "lolURL"
    },
    {
      reviewId: 2,
      url: "huhURL"
    },
    {
      reviewId: 3,
      url: "wowURL"
    },
    {
      reviewId: 3,
      url: "ahhLOL"
    }
  ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
