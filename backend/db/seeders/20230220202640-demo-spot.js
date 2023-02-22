'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Spots'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const spots = [
      {
        ownerId: 1,
        address: "123 Rainbow Road",
        city: "San Francisco",
        state: "California",
        country: "United States",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Mario's House",
        description: "A small house, that belongs to the famous Mario from the gaming franchise",
        price: 150
      },
      {
        ownerId: 2,
        address: "456 Golden Saucer",
        city: "Seattle",
        state: "Washington",
        country: "United States",
        lat: 50.543823,
        lng: -102.538539,
        name: "Cloud's House",
        description: "Cloud Strife's home; minimal decor, lodge style home",
        price: 30
      },
      {
        ownerId: 3,
        address: "789 Random",
        city: "Los Angeles",
        state: "California",
        country: "United States",
        lat: 43.6150,
        lng: 116.2023,
        name: "Random house",
        description: "A random house, in Boise, Idaho",
        price: 400
      },
      {
        ownerId: 2,
        address: "111 Slum Slums",
        city: "Midgar",
        state: "Sector 7",
        country: "Gaia",
        lat: 41.2565,
        lng: 95.9345,
        name: "Seventh Heaven",
        description: "A bar in the Sector 7 Slums of Midgar, spacious and cozy with arcade machines",
        price: 1000
      },
      {
        ownerId: 1,
        address: "222 Mushroom Ave",
        city: "Mario City",
        state: "Mariofornia",
        country: "United Marios",
        lat: 35.6870,
        lng: 105.9378,
        name: "Mario's Castle",
        description: "A large castle filled with antique decor, monsters may roam about",
        price: 12345
      }

    ]

    await queryInterface.bulkInsert(options, spots, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
