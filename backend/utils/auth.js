const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot } = require('../db/models');
const spot = require('../db/models/spot');

const { secret, expiresIn } = jwtConfig

const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) }
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie('token', token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

const requireAuthentication = function (req, res, next) {
  if (req.user) return next();

  const err = {
    message: 'Authentication required',
    statusCode: 401
  };

  return res.status(401).json(err);
};

const requireAuthorization = async function (req, res, next) {
  const spotOwnerId = await Spot.findByPk(req.params.spotId, {
    attributes: ['ownerId']
  });

  // possibly turn this if condition to a try catch block on the spotOwnerId
  // -- works for now though;
  if (!spotOwnerId) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  } else if (req.user.id !== spotOwnerId.dataValues.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
    })
  } else {
    return next();
  }

}


module.exports = { setTokenCookie, restoreUser, requireAuthentication, requireAuthorization };
