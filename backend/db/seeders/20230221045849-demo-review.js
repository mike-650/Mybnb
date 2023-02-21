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
        spotId: 1,
        userId: 2,
        review: 'The house looks exactly like the star from Mario',
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: 'It was extremely cozy and more spacious than I expected',
        stars: 5
      },     {
        spotId: 2,
        userId: 3,
        review: 'The place is rather small and gets cold at night',
        stars: 3
      },     {
        spotId: 2,
        userId: 1,
        review: 'The lodge style is definitely there, could use more amenities',
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: 'Considering that the description was vague, the place itself is quite nice',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
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
