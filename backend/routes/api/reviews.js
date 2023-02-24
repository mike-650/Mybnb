const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuthentication, requireAuthorization } = require('../../utils/auth');
const { runInContext } = require('vm');
const { truncate } = require('fs');

// Get all current user's reviews
router.get('/current', requireAuthentication, async (req, res) =>{
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
        attributes:  {
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
    if(review.Spot.SpotImages[0] !== undefined) {
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
})


module.exports = router;
