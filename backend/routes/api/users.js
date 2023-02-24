const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
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

// SUCCESFUL ON RENDER
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    let user;
    try {
      // this will either return a new instance of the user
      // or as a ValidationError
      user = await User.signup({ email, username, password, firstName, lastName });

    } catch(err) {
      // check if the error is related to the username
      if (err.errors[0].path === 'username') {
        return res.status(403).json(
          {
          message: "User already exists",
          statusCode: 403,
          errors: {
            "username": "User with that username already exists"
          }
        })
      // check if the error is related to the email
      } else if (err.errors[0].path === 'email') {
        return res.status(403).json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      }
    }

    const token = setTokenCookie(res, user);

    // destructure the user instance
    return res.json({
      id: user.dataValues.id,
      firstName: user.dataValues.firstName,
      lastName: user.dataValues.lastName,
      email: user.dataValues.email,
      username: user.dataValues.username,
      token: token
    });
  }
);

module.exports = router;
