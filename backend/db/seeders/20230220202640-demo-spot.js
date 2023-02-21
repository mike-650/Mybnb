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
        name: "Star House",
        description: "A house that resembles a star from Mario, with relevant theme decor",
        price: 150
      },
      {
        ownerId: 2,
        address: "456 Golden Saucer",
        city: "Seattle",
        state: "Washington",
        country: "United States",
        lat: 50.543823,
        lng: -245.538539,
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
        address: "111 Bayshore Ave",
        city: "Omaha",
        state: "Nebraska",
        country: "United States",
        lat: 41.2565,
        lng: 95.9345,
        name: "Tree House",
        description: "A tree house with bright lights, cozy decor, and a wonderful view",
        price: 1000
      },
      {
        address: "222 Hillcrest Dr",
        city: "Sante Fe",
        state: "New Mexico",
        country: "United States",
        lat: 35.6870,
        lng: 105.9378,
        name: "Beach House",
        description: "A large beach house with modern decor and plentiful amenities",
        price: 12345
      }

    ]

    await queryInterface.bulkInsert(options, spots, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
