'use strict';

const UserModel = require('../models/UserModel');

async function bearerAuth(req, res, next) {
  if (!req.headers.authorization) {
    next('Invalid Login');
  }

  let token = req.headers.authorization.split(' ')[1];
  let userRecord = await UserModel.authenticateToken(token);
  if (userRecord) {
    req.user = userRecord;
    next();
  } else {
    next('Invalid token');
  }
}

module.exports = bearerAuth;
