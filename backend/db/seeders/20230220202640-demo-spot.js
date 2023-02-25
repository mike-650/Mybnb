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
        city: "Yoshi York City",
        state: "New Yoshi",
        country: "Mushroom Kingdom",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Mario's House",
        description: "A small house, that belongs to the famous Mario from the gaming franchise",
        price: 150
      },
      {
        ownerId: 2,
        address: "456 Mt. Nibel",
        city: "Nibelheim",
        state: "Nibel Area",
        country: "Gaia",
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
        description: "A random house, in a random place",
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
      },
      {
        ownerId: 4,
        address: "*Disclosed*",
        city: "Fox Archipelago",
        state: "Alaska",
        country: "United States",
        lat: 55.2321,
        lng: 120.3574,
        name: "Shadow Moses Island",
        description: "Shadow Moses is an island that is part of the Fox Archipelago lying southwest of mainland Alaska in the Bering Sea. A nuclear weapons disposal facility located on Shadow Moses secretly doubled as a massive weapons development complex.",
        price: 1000000
      },
      {
        ownerId: 3,
        address: "13 Odell Ave",
        city: "Los Angeles",
        state: "California",
        country: "United States",
        lat: 15.5484,
        lng: 123.2819,
        name: "Odell' House",
        description: "Large mansion with a large outdoor infinity pool",
        price: 13000
      },
      {
        ownerId: 4,
        address: "1738 Solid Ave",
        city: "Stone Town",
        state: "Zanzibar",
        country: "Tanzia",
        lat: 65.2632,
        lng: -110.2468,
        name: "Snake's House",
        description: "Solid Snake's private home, tiny and compact",
        price: 10
      },
      {
        ownerId: 5,
        address: "101 Aku Aku Dr.",
        city: "Wumpa City",
        state: "Wumpa Island",
        country: "Australia",
        lat: 23.2145,
        lng: 120.6812,
        name: "Crash's House",
        description: "A small cottage house surrounded by trees",
        price: 55
      },
      {
        ownerId: 6,
        address: "123 Conch St.",
        city: "Bikini Bottom City",
        state: "Bikini Bottom",
        country: "United States",
        lat: 27.2356,
        lng: -155.9210,
        name: "Spongebob's House",
        description: "A pineapple shaped house with 2 bedrooms and full sized kitchen",
        price: 30
      },
      {
        ownerId: 7,
        address: "120 Conch St.",
        city: "Bikini Bottom City",
        state: "Bikini Bottom",
        country: "United States",
        lat: 27.2356,
        lng: -155.9300,
        name: "Patrick's House",
        description: "A bolder with furniture made of sand",
        price: 1
      },
      {
        ownerId: 8,
        address: "122 Conch St.",
        city: "Bikini Bottom City",
        state: "Bikini Bottom",
        country: "United States",
        lat: 27.2356,
        lng: -155.9265,
        name: "Squidward's House",
        description: "A house that is based on the Easter Island heads called Moai, well furnished",
        price: 50
      }
    ]

    await queryInterface.bulkInsert(options, spots, {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
