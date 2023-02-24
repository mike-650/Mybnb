const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { User, Spot, Review, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuthentication, requireAuthorization } = require('../../utils/auth');
const { runInContext } = require('vm');
const { truncate } = require('fs');


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
        }
      },
      {
        model: ReviewImage,
        attributes: {
          exclude: ['reviewId', 'createdAt', 'updatedAt']
        }
      }
    ]
  });


  return res.json({ reviews })
})


module.exports = router;
