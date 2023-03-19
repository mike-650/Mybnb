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
        state: "California",
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
        city: "New York City",
        state: "New York",
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
        state: "Illinois",
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
        state: "California",
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
        state: "Florida",
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
        state: "Massachusetts",
        country: "United States",
        lat: 42.3601,
        lng: -71.0589,
        name: "Historic Boston Brownstone",
        description: "This charming and characterful brownstone is located in the heart of Boston's historic Beacon Hill neighborhood, just a stone's throw from the city's most famous landmarks.",
        price: 220.90
      },
      {
        ownerId: 1,
        address: "432 Oak Street",
        city: "Austin",
        state: "Texas",
        country: "United States",
        lat: 30.2672,
        lng: -97.7431,
        name: "Stylish Austin Condo",
        description: "This modern and spacious condo is located in the trendy South Congress neighborhood of Austin, known for its vibrant music scene and great food.",
        price: 145.80
      },
      {
        ownerId: 2,
        address: "123 Main Street",
        city: "Seattle",
        state: "Washington",
        country: "United States",
        lat: 47.6062,
        lng: -122.3321,
        name: "Charming Seattle Bungalow",
        description: "This cozy bungalow is located in the heart of Seattle's Capitol Hill neighborhood, just a short walk from the city's best coffee shops and bookstores.",
        price: 180.50
      },
      {
        ownerId: 1,
        address: "921 Real Street",
        city: "San Francisco",
        state: "California",
        country: "United States",
        lat: 47.6062,
        lng: -111.2341,
        name: "Arcadia Bay Beachhouse",
        description: "This stylish and sophisticated apartment is located in the heart of Chicago, just a short walk from the famous Magnificent Mile.",
        price: 120.30
      },
      {
        ownerId: 2,
        address: "56th Where Street",
        city: "San Jose",
        state: "California",
        country: "United States",
        lat: 47.6062,
        lng: -111.2341,
        name: "San Jose House",
        description: "This stylish and sophisticated house is located in the heart of San Jose, just a short walk from SJSU.",
        price: 250.50
      },
      {
        ownerId: 3,
        address: "101 Random Ave",
        city: "Houston",
        state: "Texas",
        country: "United States",
        lat: 47.6062,
        lng: -111.2341,
        name: "Texas House",
        description: "This stylish and sophisticated house is located in the heart of Houston.",
        price: 100.12
      },
    ]

    await queryInterface.bulkInsert(options, spots, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
