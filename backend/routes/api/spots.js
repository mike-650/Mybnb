const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review } = require('../../db/models');
const { requireAuthentication, requireAuthorization } = require('../../utils/auth');
const { runInContext } = require('vm');
const { truncate } = require('fs');

const validateSpotInput = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude is not valid'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required'),
  handleValidationErrors
];

// NEED TO FIX
// Get All Spots
router.get('/', async (_req, res) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: Review
      },
      {
        model: SpotImage
      }
    ]
  });

  let spotsList = [];
  spots.forEach(spot => {
    spotsList.push(spot.toJSON());
  });

  spotsList.forEach(spot => {
    let starTotal = 0;
    let reviewsTotal = 0;
    spot.Reviews.forEach(review => {
      reviewsTotal++
      starTotal += review.stars
    });
    spot.avgRating = starTotal / reviewsTotal;
    delete spot.Reviews;
  })

  spotsList.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if (image.preview === true) {
        spot.previewImage = image.url;
      }
    });
    if (!spot.previewImage) {
      spot.previewImage = 'no preview image found'
    }
    delete spot.SpotImages;
  });

  return res.json(spotsList);
});

// NEED TO FIX
// Get All Spots by Current User *Authentication Required*
router.get('/current', requireAuthentication, async (req, res) => {
  // req.user.dataValues.id <-- current user's id
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.dataValues.id
    },
    attributes: {
      // find average rating and alias it as 'avgRating'
      include: [[Sequelize.fn('AVG', Sequelize.col('reviews.stars')), 'avgRating']]
    },
    include: [
      {
        model: Review,
        // don't include any attributes from the Review model in the output
        attributes: [],
        required: true
      },
      {
        model: SpotImage,
        separate: true
      }
    ],
    // group by spot id to get the average for each unique spot
    group: ['Spot.id']
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

  return res.status(200).json({ 'Spots': spotsList });
});

// NEED TO FIX
// Get a spot by Id
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findOne({
    where: { id: spotId },
    include: [
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview'],
      },
      {
        model: User,
        as: 'Owner',
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: Review,
        attributes: [],
      }
    ],
    attributes: {
      include: [
        // Find all the reviews and calc the avg rating associated with this Spot Model
        [Sequelize.fn('COUNT', Sequelize.col('reviews.id')), 'numReviews'],
        [Sequelize.fn('AVG', Sequelize.col('reviews.stars')), 'avgStarRating']
      ]
    },
    //
    group: ['Spot.id', 'SpotImages.id', 'Owner.id']
  });

  if (spot === null) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    });
  };
  return res.json(spot);
})

// Create a Spot
router.post('/', [requireAuthentication, validateSpotInput], async (req, res) => {
  const {
    address, city, state,
    country, lat, lng,
    name, description, price
  } = req.body;

  const ownerId = req.user.dataValues.id;

  let spot = await Spot.createSpot(
    {
      ownerId, address, city,
      state, country, lat, lng,
      name, description, price
    });

  return res.status(201).json(spot);
})

// Add an Image to a Spot based on Spot's id
router.post('/:spotId/images', [requireAuthentication, requireAuthorization], async (req, res) => {
  const { spotId } = req.params
  const { url, preview } = req.body

  // find the current preview that is set the true
  let currentPreview = await SpotImage.findOne({
    where: {
      preview: true
    }
  });

  // check if this returned null or not
  if (currentPreview) {
    // if yes; update that preview to false
    await currentPreview.update(
      { preview: false },
      { where: { id: currentPreview.id } }
    );
  }

  // create the new image (is the new preview image; preview: 'true')
  let newImage = await SpotImage.create({
    spotId, url, preview
  });

  const imageJSON = newImage.toJSON();

  // delete unnecessary properties
  delete imageJSON.spotId;
  delete imageJSON.createdAt;
  delete imageJSON.updatedAt;

  return res.json(imageJSON);
})


// Edit a Spot
router.put('/:spotId', [requireAuthentication, requireAuthorization, validateSpotInput], async (req, res) => {
  // deconstruct the spotId and req.body args
  const { spotId } = req.params
  const {
    address, city, state,
    country, lat, lng,
    name, description, price
  } = req.body

  // query the spot to be updated
  const spot = await Spot.findByPk(spotId)

  // then updated that record
  const updatedSpot = await spot.update(
    {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    }
  );
  // return the specified response
  return res.json(updatedSpot);
});

// Delete a Spot
router.delete('/:spotId', [requireAuthentication, requireAuthorization], async (req, res) => {
  // deconstruct the spotId
  const { spotId } = req.params;
  // query the spot to be deleted
  const spot = await Spot.findByPk(spotId);

  // delete the spot
  try {
    await spot.destroy();
    // return success response
    return res.json({
      message: "Successfully deleted",
      statusCode: 200
    });
  } catch (error) {
    // handle any errors that occur during deletion
    console.error(error);
    return res.status(500).send('Error deleting spot');
  }

})

module.exports = router;
