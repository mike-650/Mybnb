'use strict';

let options = {};
options.tableName = 'SpotImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "falseImage.lol/image",
        preview: false
      },
      {
        spotId: 1,
        url: "trueImage.lol/image2",
        preview: true
      },
      {
        spotId: 2,
        url: "googa.lol/randomImg",
        preview: true
      },
      {
        spotId: 2,
        url: "googalia.lol/randomImg3",
        preview: false
      },
      {
        spotId: 3,
        url: "yawhooha.lol/randomImg5",
        preview: false
      },
      {
        spotId: 3,
        url: "yawhoo.lol/arbitraryImage",
        preview: false
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
