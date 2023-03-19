const express = require('express');
const router = express.Router();
const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuthentication, validateReviewInput } = require('../../utils/auth');
const { runInContext } = require('vm');
const { truncate } = require('fs');

// Get all current user's reviews
router.get('/current', requireAuthentication, async (req, res) => {
  const userId = req.user.dataValues.id;

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
  });

  reviewsList.forEach(review => {
    if (review.Spot.SpotImages[0] !== undefined) {
      review.Spot.previewImage = review.Spot.SpotImages[0].url
      delete review.Spot.SpotImages;
    } else {
      review.Spot.previewImage = 'no preview image available'
      delete review.Spot.SpotImages;
    };

  });
  return res.json({ 'Reviews': reviewsList });
});

// Add an Image to a Review based on Review's id
router.post('/:reviewId/images', [requireAuthentication], async (req, res) => {
  const { reviewId } = req.params;
  // If a review can't be found return a 404 response
  const review = await Review.findByPk(reviewId);
  if (review === null) {
    res.status(404).json(
      {
        message: "Review couldn't be found",
        statusCode: 404
      }
    );
} else if (req.user.dataValues.id !== review.toJSON().userId ) {
  return res.status(403).json(
    {
      message: "Forbidden",
      statusCode: 403
    }
  )
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
});

// Edit a Review
router.put('/:reviewId',[requireAuthentication, validateReviewInput],
 async (req, res) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;

  // check if the review exists
  const oldReview = await Review.findByPk(reviewId);
  if (!oldReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404
    })
    // check if it's not their review
  } else if (req.user.dataValues.id !== oldReview.dataValues.userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
    })
  };

  const updatedReview = await oldReview.update(
    {
      review,
      stars
    }
  );

  return res.json(updatedReview);
});

// Delete a Review
router.delete('/:reviewId', requireAuthentication, async (req, res) => {
  const { reviewId } = req.params;

  const review = await Review.findByPk(reviewId);
  if (review === null) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  } else if (req.user.dataValues.id !== review.dataValues.userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
    });
  };

  await review.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  });
});

module.exports = router;
