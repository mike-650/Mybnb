const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuthentication, requireAuthorization, validateReviewInput } = require('../../utils/auth');

// NEED TO TEST
// Get All Bookings for Current User
router.get('/current', requireAuthentication, async (req, res) => {
  const bookings = await Booking.findAll({
    where: {
      userId: req.user.dataValues.id
    },
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: SpotImage
          }
        ]
      },
    ]
  });

  if (bookings.length === 0) {
    res.status(404).json({
      message: "There are currently no bookings for this User",
      statusCode: 404
    })
  };

  const bookingsList = [];
  bookings.forEach(booking => {
    bookingsList.push(booking.toJSON());
  })

  bookingsList.forEach(booking => {
    booking.Spot.SpotImages.forEach(image => {
      if (image.preview === true) {
        booking.Spot.previewImage = image.preview;
      };
    });
    if (!booking.Spot.previewImage) {
      booking.Spot.previewImage = "No preview image available";
    };
    delete booking.Spot.SpotImages;
  });

 return res.json({ "Bookings": bookingsList });
});

// WIP
// Edit a Booking
router.put('/:bookingId', requireAuthentication, async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findByPk(bookingId);
  if (booking === null) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
  } else if (req.user.dataValues.id !== booking.dataValues.userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
    })
  }


  res.json("test")
});

// FINISHED? Don't know if we just delete bookings that are in the
// future or do we not delete bookings that are between the start and end date?
// Delete a Booking
router.delete('/:bookingId', requireAuthentication, async (req, res) => {
  const { bookingId } = req.params;

  // check if the booking exists
  const booking = await Booking.findByPk(bookingId);
  if (booking === null) {
    return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404
    })
    // check if the bookings belongs to the user
  } else if (req.user.dataValues.id !== booking.dataValues.userId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
    })
  };

  // format the dates to be compared
  const currentDate = new Date().toISOString().substring(0, 10);
  const bookingDate = booking.toJSON().endDate

  if (currentDate < bookingDate) {
    const deletedBooking = await booking.destroy();
    console.log({deletedBooking});
    return res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200
    });
  } else {
    return res.status(403).json({
        message: "Bookings that have been started can't be deleted",
        statusCode: 403
    });
  };
});

module.exports = router;