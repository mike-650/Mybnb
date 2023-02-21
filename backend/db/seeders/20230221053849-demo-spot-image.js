'use strict';

let options = {};
options.tableName = 'SpotImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "exampleImage.com/image",
        preview: true
      },
      {
        spotId: 2,
        url: "googa.com/randomImg",
        preview: true
      },
      {
        spotId: 3,
        url: "yawhoo.com/arbitraryImage",
        preview: true
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
