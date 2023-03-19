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
        url: "https://www.apartments.com/images/librariesprovider2/blank-images/parkline-apartment-in-miami-flba486679-f59b-475d-885a-ae52659d1e51.jpg?sfvrsn=264e5d72_1",
        preview: false
      },
      {
        spotId: 1,
        url: "https://images1.apartments.com/i2/Om8qArFMM4jl0rMwiu_o3DjsmWj6qNDUC6SZnLvl9i0/111/8500-burton-luxury-apartments-los-angeles-ca-primary-photo.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/345613052.jpg?k=2386564524e57ff238ebd70931ff9988d0d86cb39548ab15a3bc08600a2efcea&o=&hp=1",
        preview: false
      },
      {
        spotId: 1,
        url: "https://images1.apartments.com/i2/Om8qArFMM4jl0rMwiu_o3DjsmWj6qNDUC6SZnLvl9i0/111/8500-burton-luxury-apartments-los-angeles-ca-primary-photo.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://images1.apartments.com/i2/Om8qArFMM4jl0rMwiu_o3DjsmWj6qNDUC6SZnLvl9i0/111/8500-burton-luxury-apartments-los-angeles-ca-primary-photo.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/345613052.jpg?k=2386564524e57ff238ebd70931ff9988d0d86cb39548ab15a3bc08600a2efcea&o=&hp=1",
        preview: true
      },
      {
        spotId: 2,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/345613052.jpg?k=2386564524e57ff238ebd70931ff9988d0d86cb39548ab15a3bc08600a2efcea&o=&hp=1",
        preview: false
      },
      {
        spotId: 2,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://archello.s3.eu-central-1.amazonaws.com/images/2020/08/09/comelite-architecture-structure-and-interior-design-contemporary-luxury-apartment-design-apartments-archello.1596935634.5614.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://liveatlakeandwells.com/wp-content/uploads/2020/08/Lake_and_Wells_Apartments_Interior.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://archello.s3.eu-central-1.amazonaws.com/images/2020/08/09/comelite-architecture-structure-and-interior-design-contemporary-luxury-apartment-design-apartments-archello.1596935634.5614.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://archello.s3.eu-central-1.amazonaws.com/images/2020/08/09/comelite-architecture-structure-and-interior-design-contemporary-luxury-apartment-design-apartments-archello.1596935634.5614.jpg",
        preview: false
      },
      {
        spotId: 3,
        url: "https://archello.s3.eu-central-1.amazonaws.com/images/2020/08/09/comelite-architecture-structure-and-interior-design-contemporary-luxury-apartment-design-apartments-archello.1596935634.5614.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://s.wsj.net/public/resources/images/B3-CC754_russia_M_20181022105812.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 4,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://res.cloudinary.com/apartmentlist/image/upload/f_auto,q_auto,t_web-base/e5a843ce91f3dcdacab9bd541ad1d107.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/5-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 5,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://assets.site-static.com/userFiles/654/image/blog_images/boston_brownstones_for_sale.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 6,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
        preview: true
      },
      {
        spotId: 7,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 7,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://liveatlakeandwells.com/wp-content/uploads/2020/08/Lake_and_Wells_Apartments_Interior.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://images1.apartments.com/i2/Om8qArFMM4jl0rMwiu_o3DjsmWj6qNDUC6SZnLvl9i0/111/8500-burton-luxury-apartments-los-angeles-ca-primary-photo.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 8,
        url: "https://charlotte.axios.com/wp-content/uploads/2022/11/1216-Pinecrest-Dr-feature-image.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 9,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: true
      },
      {
        spotId: 9,
        url: "https://www.apartments.com/images/librariesprovider2/blank-images/parkline-apartment-in-miami-flba486679-f59b-475d-885a-ae52659d1e51.jpg?sfvrsn=264e5d72_1",
        preview: false
      },
      {
        spotId: 9,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: 'https://media.california.com/media/_versions/articles/san_jose_neighborhood_guide__2479x1428___v1222x580.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/2-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.glenwoodnyc.com/wp-content/uploads/2022/05/5-JSP-LOBBY-01-02-1280.jpg",
        preview: false
      },
      {
        spotId: 10,
        url: 'https://media.california.com/media/_versions/articles/san_jose_neighborhood_guide__2479x1428___v1222x580.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/345613052.jpg?k=2386564524e57ff238ebd70931ff9988d0d86cb39548ab15a3bc08600a2efcea&o=&hp=1',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/345613052.jpg?k=2386564524e57ff238ebd70931ff9988d0d86cb39548ab15a3bc08600a2efcea&o=&hp=1',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/345613052.jpg?k=2386564524e57ff238ebd70931ff9988d0d86cb39548ab15a3bc08600a2efcea&o=&hp=1',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/345613052.jpg?k=2386564524e57ff238ebd70931ff9988d0d86cb39548ab15a3bc08600a2efcea&o=&hp=1',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://media.california.com/media/_versions/articles/san_jose_neighborhood_guide__2479x1428___v1222x580.jpg',
        preview: false
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, {}, {});
  }
};
