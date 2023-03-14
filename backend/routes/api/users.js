const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    let takenUser = await User.findOne({
      where: {
        username
      }
    });

    let takenEmail = await User.findOne({
      where: {
        email
      }
    });
      
    let errors = {}
    if (takenUser) errors.user = 'Username must be unique.';
    if (takenEmail) errors.email = 'The provided email is invalid.'

    if (Object.values(errors).length) {
      return res.status(403).json(
        {
        message: "User already exists",
        statusCode: 403,
        errors
      })
    }

    let user = await User.signup({ email, username, password, firstName, lastName });

    setTokenCookie(res, user);

    // destructure the user instance
    return res.json({ user: {
      id: user.dataValues.id,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      email: user.dataValues.email,
      username: user.dataValues.username
    }});
  }
);

module.exports = router;
