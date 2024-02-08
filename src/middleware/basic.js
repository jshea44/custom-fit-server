'use strict';

const base64 = require('base-64');
const UserModel = require('../models/UserModel.js');

async function basicAuth(req, res, next) {
  if (!req.headers.authorization) {
    next('Invalid login');
  }

  let encodedString = req.headers.authorization.split(' ')[1];
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');
  let validUser = await UserModel.authenticateBasic(username, password);
  if (validUser) {
    req.user = validUser;
    next();
  } else {
    next('Invalid Login');
  }
}

module.exports = basicAuth;
