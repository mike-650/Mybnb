const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuthentication, requireAuthorization } = require('../../utils/auth');
const { runInContext } = require('vm');
const { truncate } = require('fs');
const review = require('../../db/models/review');

// FINISHED
// Get all current user's reviews
router.get('/current', requireAuthentication, async (req, res) => {
  const userId = req.user.dataValues.id

  const reviews = await Review.findAll({
    where: {
      userId
    },
    attributes: ['id', 'spotId', 'userId', 'review', 'stars', 'createdAt', 'updatedAt'],
    include: [
      {
        model: User,
        attributes: {
          exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
        }
      },
      {
        model: Spot,
        attributes: {
          exclude: ['description', 'createdAt', 'updatedAt']
        },
        include: [
          {
            model: SpotImage,
            where: {
              preview: true
            },
            attributes: ['url'],
            required: false
          }
        ]
      },
      {
        model: ReviewImage,
        attributes: {
          exclude: ['reviewId', 'createdAt', 'updatedAt']
        }
      }
    ]
  });

  let reviewsList = [];
  reviews.forEach(review => {
    reviewsList.push(review.toJSON())
  })

  reviewsList.forEach(review => {
    if (review.Spot.SpotImages[0] !== undefined) {
      review.Spot.previewImage = review.Spot.SpotImages[0].url
      delete review.Spot.SpotImages;
    } else {
      review.Spot.previewImage = 'no preview image available'
      delete review.Spot.SpotImages;
    }

    if (!review.ReviewImages.length) {
      review.ReviewImages = 'no review images available'
    }
  });
  return res.json({ 'Reviews': reviewsList })
});

// NEED TO TEST
// Add an Image to a Review based on Review's id
router.post('/:reviewId/images', [requireAuthentication], async (req, res) => {
  const { reviewId } = req.params
  // If a review can't be found return a 404 response
  const review = await Review.findByPk(reviewId)
  if (review === null) {
    res.status(403).json(
      {
        message: "Review couldn't be found",
        statusCode: 404
      }
    );
  }
  // Check if the review has 10 images or more
  const allReviews = await ReviewImage.findAll({
    where: {
      reviewId
    }
  });

  let jsonReviews = [];
  allReviews.forEach(review => {
    jsonReviews.push(review.toJSON())
  })

  // If so; return error
  if (jsonReviews.length >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 403
    });
  };

  const { url } = req.body;
  if (!url) return res.status(400).json("URL is required");
  // Create review image record
  const newReviewImage = await ReviewImage.create({
    reviewId,
    url
  });

  const filterImage = newReviewImage.toJSON();

  // delete unnecessary properties
  delete filterImage.reviewId;
  delete filterImage.updatedAt;
  delete filterImage.createdAt;


  res.json(filterImage);
})



module.exports = router;
