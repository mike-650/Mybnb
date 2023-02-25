const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuthentication, requireAuthorization, validateReviewInput } = require('../../utils/auth');

// NEED TO TEST
// Delete a Spot Image
router.delete('/:imageId', requireAuthentication, async (req, res) => {
  const { imageId } = req.params;

  const spotImage = await SpotImage.findByPk(imageId);
  if (spotImage === null) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
      statusCode: 404
    });
  };

  const spot = await Spot.findByPk(spotImage.dataValues.spotId);
  if (req.user.dataValues.id !== spot.dataValues.id) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
    })
  };

  await spotImage.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  });
})


module.exports = router;
