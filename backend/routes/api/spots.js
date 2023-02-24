const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuthentication, requireAuthorization, validateReviewInput } = require('../../utils/auth');
const { runInContext } = require('vm');
const { truncate } = require('fs');
const { BOOLEAN } = require('sequelize');
const booking = require('../../db/models/booking');

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
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price per day is required')
    .isNumeric()
    .withMessage('Price must be a valid numeric value'),
  handleValidationErrors
];


// SUCCESFUL ON RENDER
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

  return res.json({ 'Spots': spotsList });
});

// SUCCESFUL ON RENDER ** ADDED LINE 121-123, NEEDS TESTING
// Get All Spots by Current User *Authentication Required*
router.get('/current', requireAuthentication, async (req, res) => {
  // req.user.dataValues.id <-- current user's id
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.dataValues.id
    },
    include: [
      {
        model: Review
      },
      {
        model: SpotImage
      }
    ]
  });

  // NEED TO TEST
  // If user has no spots
  if (!spots.length) {
    return res.status(404).json({ message: "No spots were found for the current user." });
  };

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

  return res.json({ 'Spots': spotsList });
});

// NEED TO FIX SAVE FOR LATER
// Get a spot by Id
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;

  const spots = await Spot.findAll({
    where: {
      id: spotId
    },
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
        attributes: []
      }
    ],
    attributes: {
      include: [
        [Sequelize.fn('COUNT', Sequelize.col('reviews.id')), 'numReviews'],
        [Sequelize.fn('AVG', Sequelize.col('reviews.stars')), 'avgStarRating']
      ]
    },
    group: ['Spot.id', 'SpotImages.id', 'Owner.id']
  });

  if (spots.length === 0) {
    res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  return res.json(spots[0]);
})

// SUCCESFUL ON RENDER
// Get all reviews by a spot id
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;

  // grab all reviews that are associated with the spot
  const reviews = await Review.findAll({
    where: {
      spotId: spotId
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
        }
      },
      {
        model: ReviewImage,
        attributes: {
          exclude: ['reviewId', 'createdAt', 'updatedAt']
        }
      }
    ]
  })

  // if the spot isnt found check
  if (!reviews.length) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }

  let reviewList = [];
  reviews.forEach(review => {
    reviewList.push(review.toJSON())
  });

  // replace empty array with message
  reviewList.forEach(review => {
    if (review.ReviewImages.length === 0) {
      review.ReviewImages = 'no review images available'
    }
  })

  return res.json({ 'Reviews': reviewList });
})

// NEED TO TEST
// Get All Bookings for a Spot by ID
router.get('/:spotId/bookings', requireAuthentication, async (req, res) => {
  const { spotId } = req.params
  const spot = await Spot.findByPk(spotId)

  if (spot === null) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      status: 404
    });
  };
  // If the current user DOES NOT own the spot
  if (req.user.dataValues.id !== spot.dataValues.ownerId) {
    const bookings = await Booking.findAll({
      where: {
        userId: req.user.dataValues.id
      },
      attributes: {
        exclude: ['id', 'userId', 'createdAt', 'updatedAt']
      }
    })
    return res.json({ "Bookings": bookings });
    // If the current user OWNS the spot
  } else {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: {
            include: ['id', 'firstName', 'lastName'],
            exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
          }
        }
      ],
      where: {
        spotId
      }
    })
    return res.json({ "Bookings": bookings });
  };
})

// FINISHED
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

// NEED TO TEST
// Create a Review for a Spot by id
router.post('/:spotId/reviews',
[requireAuthentication, validateReviewInput],
 async (req, res) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;

  // check if the spot exists
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
  };

  const newReview = await Review.create({
    spotId,
    userId: req.user.dataValues.id,
    review,
    stars
  });

  return res.json(newReview)
})

// FINISHED ** ADDED NAME REQ MSG IN VALIDSPOTINPUT NEED TO TEST
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

// WIP
// Delete a Spot
router.delete('/:spotId', [requireAuthentication, requireAuthorization], async (req, res) => {
  // deconstruct the spotId
  const { spotId } = req.params;
  // query the spot to be deleted
  const spot = await Spot.findByPk(spotId);
})

module.exports = router;
