'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Reviews'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const reviews = [
      {
        spotId: 16,
        userId: 11,
        review: 'The house looks exactly like the star from Mario',
        stars: 4
      },
      {
        spotId: 16,
        userId: 12,
        review: 'It was extremely cozy and more spacious than I expected',
        stars: 5
      },     {
        spotId: 17,
        userId: 10,
        review: 'The place is rather small and gets cold at night',
        stars: 3
      },     {
        spotId: 17,
        userId: 12,
        review: 'The lodge style is definitely there, could use more amenities',
        stars: 4
      },
      {
        spotId: 18,
        userId: 11,
        review: 'Considering that the description was vague, the place itself is quite nice',
        stars: 5
      },
      {
        spotId: 18,
        userId: 12,
        review: 'Stay away from this AirBnb',
        stars: 1
      }
    ]

    await queryInterface.bulkInsert(options, reviews, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
