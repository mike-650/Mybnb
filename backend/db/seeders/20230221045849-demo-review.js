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
        review: 'This spot was awesome!',
        stars: 4
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Amazing!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'It was alright.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 1,
        review: 'Fuuuuun!',
        stars: 4
      },
      {
        spotId: 3,
        userId: 1,
        review: 'The house was very spacious and organized.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Stay away from this AirBnb.',
        stars: 1
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Stay away from this AirBnb.',
        stars: 2
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Awesome spot I enjoyed it very much..',
        stars: 4
      },
      {
        spotId: 5,
        userId: 3,
        review: 'Stay away from this AirBnb.',
        stars: 3
      },
      {
        spotId: 5,
        userId: 2,
        review: 'Very cool spot!',
        stars: 5
      },
      {
        spotId: 6,
        userId: 1,
        review: 'Meh...',
        stars: 2
      },
      {
        spotId: 6,
        userId: 3,
        review: 'Very cool spot!',
        stars: 5
      },
    ]

    await queryInterface.bulkInsert(options, reviews, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
