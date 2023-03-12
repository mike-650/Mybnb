'use strict';

let options = {};
options.tableName = 'SpotImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

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
        url: "https://images1.apartments.com/i2/Om8qArFMM4jl0rMwiu_o3DjsmWj6qNDUC6SZnLvl9i0/111/8500-burton-luxury-apartments-los-angeles-ca-primary-photo.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/345613052.jpg?k=2386564524e57ff238ebd70931ff9988d0d86cb39548ab15a3bc08600a2efcea&o=&hp=1",
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
        url: "https://liveatlakeandwells.com/wp-content/uploads/2020/08/Lake_and_Wells_Apartments_Interior.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://s.wsj.net/public/resources/images/B3-CC754_russia_M_20181022105812.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://res.cloudinary.com/apartmentlist/image/upload/f_auto,q_auto,t_web-base/e5a843ce91f3dcdacab9bd541ad1d107.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://assets.site-static.com/userFiles/654/image/blog_images/boston_brownstones_for_sale.jpg",
        preview: true
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
