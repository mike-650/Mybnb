const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    // store any errors in an empty object that are found
    const errors = {};

    // creates error properties with the error message associated with it
    validationErrors
      .array()
      .forEach(error => errors[error.param] = error.msg);

    return res.status(400).json({
      message: 'Validation Error',
      statusCode: '400',
      errors
    })
  }
  next();
};

module.exports = {
  handleValidationErrors
};
