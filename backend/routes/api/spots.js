const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuthentication, requireAuthorization, validateReviewInput, validateBookingDate } = require('../../utils/auth');
const { Op } = require('sequelize');
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

const validatePagination = [
  check('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be greater than or equal to 1'),
  check('size')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Size must be greater than or equal to 1'),
  check('maxLat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Maximum latitude is invalid'),
  check('minLat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Minimum latitude is invalid'),
  check('maxLng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Maximum longitude is invalid'),
  check('minLng')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Minimum longitude is invalid'),
  check('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors
]

// SUCCESFUL ON RENDER ** ADDED PAGINATION / QUERY FILTERS ** NEED TO TEST
// Get All Spots
router.get('/', validatePagination, async (req, res) => {
  let {
    page, size, minLat,
    maxLat, minLng, maxLng,
    minPrice, maxPrice
  } = req.query;

  // Only populate the where object if the values
  // are defined
  let where = {};
  if (minLat !== undefined) {
    where.lat = { [Op.gte]: minLat };
  };
  if (maxLat !== undefined) {
    where.lat = { ...where.lat, [Op.lte]: maxLat };
  };
  if (minLng !== undefined) {
    where.lng = { [Op.gte]: minLng };
  };
  if (maxLng !== undefined) {
    where.lng = { ...where.lng, [Op.lte]: maxLng };
  };
  if (minPrice !== undefined) {
    where.price = { [Op.gte]: minPrice };
  };
  if (maxPrice !== undefined) {
    where.price = { ...where.price, [Op.lte]: maxPrice };
  };

  let pagination = { where };

  // set defaults if needed
  size = size === undefined || size > 20 ? 20 : parseInt(size);
  page = page === undefined || page > 10 ? 1 : parseInt(page);

  pagination.limit = size;
  pagination.offset = size * (page - 1);


  const spots = await Spot.findAll({
    include: [
      {
        model: Review
      },
      {
        model: SpotImage
      }
    ],
    ...pagination
  });

  let Spots = [];
  spots.forEach(spot => {
    Spots.push(spot.toJSON());
  });

  Spots.forEach(spot => {
    let starTotal = 0;
    let reviewsTotal = 0;
    spot.Reviews.forEach(review => {
      reviewsTotal++
      starTotal += review.stars
    });
    spot.avgRating = starTotal / reviewsTotal;
    if (!spot.avgRating) {
      spot.avgRating = "no rating available"
    }
    delete spot.Reviews;
  })

  Spots.forEach(spot => {
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

  let data = { Spots }
  data.page = page;
  data.size = size;
  return res.json(data);
});

// SUCCESFUL ON RENDER
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

// SUCCESSFUL ON RENDER
// Get a spot by Id
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  if (spot === null) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    });
  };

  // Set numReviews property
  const formatSpot = spot.toJSON();
  const totalReviews = await spot.countReviews();

  formatSpot.numReviews = totalReviews;

  // Find average of stars and set avgStarRating property
  const reviewAvg = await Review.findAll({
    where: {
      spotId
    },
    attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avg_rating']]
  })

  formatSpot.avgStarRating = reviewAvg[0].dataValues.avg_rating;

  const spotImages = await SpotImage.findAll({
    where: {
      spotId: spotId
    }
  });

  formatSpot.SpotImages = new Array();

  // set our SpotImages property
  spotImages.forEach(image => {
    const toJSON = image.toJSON()
    delete toJSON.spotId;
    delete toJSON.createdAt;
    delete toJSON.updatedAt;
    formatSpot.SpotImages.push(toJSON);
  });

  if (!formatSpot.SpotImages.length) {
    formatSpot.SpotImages = "No Spot Images available"
  };

  // set our Owner property
  const owner = await User.findByPk(formatSpot.ownerId, {
    attributes: {
      exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
    }
  });

  formatSpot.Owner = owner.dataValues;

  return res.json(formatSpot);
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
      statusCode: 404
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

// SUCCESSFUL ON RENDER
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

// SUCCESSFUL ON RENDER
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

// SUCCESSFUL ON RENDER // Added 201 Status Code
// Create a Review for a Spot by id
router.post('/:spotId/reviews', [requireAuthentication, validateReviewInput], async (req, res) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;

  // check if the spot exists
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found", statusCode: 404 })
  };

  // check if the user has a review for the spot already
  const userReview = await Review.findOne({
    where: {
      userId: req.user.dataValues.id
    }
  });

  if (userReview) {
    return res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403
    });
  };

  const newReview = await Review.create({
    spotId,
    userId: req.user.dataValues.id,
    review,
    stars
  });

  return res.status(201).json(newReview);
})

// NEED TO TEST
// Create a Booking based on Spot ID
router.post('/:spotId/bookings', [requireAuthentication, validateBookingDate], async (req, res) => {
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;

  // check if spot exists
  const spot = await Spot.findByPk(spotId);
  if (spot === null) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    });
    // check if the current user owns the spot
  } else if (req.user.dataValues.id === spot.dataValues.ownerId) {
    return res.status(403).json({
      message: 'Forbidden',
      statusCode: 403
    });
  };

  let bookingConflict = {
    message: "Sorry this spot is already booked for the specified dates",
    statusCode: 403,
    errors: {}
  };

  const checkStartDate = await Booking.findOne({
    where: {
      spotId,
      [Op.and]: {
        startDate: { [Op.lte]: startDate },
        endDate: { [Op.gte]: startDate }
      }
    }
  });

  const checkEndDate = await Booking.findOne({
    where: {
      spotId,
      [Op.and]: {
        startDate: { [Op.lte]: endDate },
        endDate: { [Op.gte]: endDate }
      }
    }
  });
  // set properties on our bookingConflict object
  // if there were any
  if (checkStartDate) bookingConflict.errors.startDate = "Start date conflicts with an existing booking";
  if (checkEndDate) bookingConflict.errors.endDate = "End date conflicts with an existing booking";

  // if either of the queries found a bookingConflict
  // return a response with the bookingConflict error message
  if (checkStartDate || checkEndDate) {
    return res.status(403).json(bookingConflict)
  }

  const validBooking = await Booking.create({
    spotId,
    userId: req.user.dataValues.id,
    startDate,
    endDate
  });

  return res.json(validBooking);
})

// SUCCESSFUL ON RENDER
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

// SUCCESSFUL ON RENDER
// Delete a Spot
router.delete('/:spotId', [requireAuthentication, requireAuthorization], async (req, res) => {
  // deconstruct the spotId
  const { spotId } = req.params;
  // query the spot to be deleted
  const spot = await Spot.findByPk(spotId);

  await spot.destroy()

  return res.json({
    message: 'Sucessfully deleted',
    statusCode: 200
  });
});

module.exports = router;
