const express = require('express')
const router = express.Router();
const sequelize = require('sequelize')
const { Spot, SpotImage, Review } = require('../../db/models');

router.get('/', async (req, res) => {
  const spots = await Spot.findAll({
    attributes: {
      // find average rating and alias it as 'avgRating'
      include: [[sequelize.fn('AVG', sequelize.col('reviews.stars')), 'avgRating']]
    },
    include: [
      {
        model: Review,
        // don't include any attributes from the Review model in the output
        attributes: []
      },
      {
        model: SpotImage,
        separate: true
      }
    ],
    // group by spot id to get the average for each unique spot
    group: ['spot.id']
  });

  let spotsList = [];

  // allows us to manipulate each POJO
  spots.forEach(spot => {
    spotsList.push(spot.toJSON());
  })

  // Iterate through the SpotImages array to find the preview image
  // if there is one, and set previewImage to the url
  spotsList.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if (image.preview === true) {
        spot.previewImage = image.url
      };
    });
    if (!spot.previewImage) {
      spot.previewImage = 'null';
    };

    // set the avgRating to 0 if the eager load from earlier returned null
    if (spot.avgRating === null) {
      spot.avgRating = 0.0;
    };
    delete spot.SpotImages;
  });

  res.status(200).json({ 'Spots': spotsList });
});


module.exports = router;
