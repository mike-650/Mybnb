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
        address: "123 Main Street",
        city: "Los Angeles",
        state: "CA",
        country: "United States",
        lat: 34.0522,
        lng: -118.2437,
        name: "Luxury Apartment",
        description: "This spacious and modern apartment is located in the heart of downtown LA and features breathtaking views of the city skyline.",
        price: 250.20
      },
      {
        ownerId: 2,
        address: "789 Oak Street",
        city: "New York",
        state: "NY",
        country: "United States",
        lat: 40.7128,
        lng: -74.006,
        name: "Charming Studio Apartment",
        description: "This cozy and comfortable studio apartment is located in a historic building in the heart of downtown New York, just steps away from all the action.",
        price: 150.25
      },
      {
        ownerId: 3,
        address: "456 Maple Avenue",
        city: "Chicago",
        state: "IL",
        country: "United States",
        lat: 41.8781,
        lng: -87.6298,
        name: "Elegant Chicago Apartment",
        description: "This stylish and sophisticated apartment is located in the heart of Chicago, just a short walk from the famous Magnificent Mile.",
        price: 300.50
      },
      {
        ownerId: 1,
        address: "321 Elm Street",
        city: "San Francisco",
        state: "CA",
        country: "United States",
        lat: 37.7749,
        lng: -122.4194,
        name: "Spacious San Francisco Home",
        description: "This beautiful and spacious home is located in the heart of San Francisco, offering stunning views of the city and easy access to all the attractions.",
        price: 200.75
      },
      {
        ownerId: 2,
        address: "987 Pine Street",
        city: "Miami",
        state: "FL",
        country: "United States",
        lat: 25.7617,
        lng: -80.1918,
        name: "Modern Miami Condo",
        description: "This sleek and contemporary condo is located in the heart of Miami, offering breathtaking views of the ocean and easy access to all the city's attractions.",
        price: 280.30
      },
      {
        ownerId: 3,
        address: "654 Cedar Street",
        city: "Boston",
        state: "MA",
        country: "United States",
        lat: 42.3601,
        lng: -71.0589,
        name: "Historic Boston Brownstone",
        description: "This charming and characterful brownstone is located in the heart of Boston's historic Beacon Hill neighborhood, just a stone's throw from the city's most famous landmarks.",
        price: 220.90
      },
      // {
      //   ownerId: 1,
      //   address: "987 Maple Avenue",
      //   city: "New York",
      //   state: "NY",
      //   country: "United States",
      //   lat: 40.7128,
      //   lng: -74.0060,
      //   name: "Sleek Modern Condo",
      //   description: "Located in the heart of Manhattan, this sleek and modern condo features stunning city views, high-end finishes, and convenient access to all of New York's top attractions.",
      //   price: 350.75
      // }
    ]

    await queryInterface.bulkInsert(options, spots, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
