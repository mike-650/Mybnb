const express = require('express');
const router = express.Router();
const { Review, ReviewImage } = require('../../db/models');
const { requireAuthentication } = require('../../utils/auth');

// Delete a Review Image
router.delete('/:imageId', requireAuthentication, async (req, res) => {
  const { imageId } = req.params;

  const reviewImage = await ReviewImage.findByPk(imageId);
  if (reviewImage === null) {
    return res.status(404).json({
      message: "Review Image couldn't be found",
      statusCode: 404
    });
  };

  const review = await Review.findByPk(reviewImage.dataValues.reviewId);
  if (req.user.dataValues.id !== review.dataValues.userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
    })
  };

  await reviewImage.destroy();
  return res.json({
    message: "Successfully deleted",
    statusCode: 200
  });
})


module.exports = router;
