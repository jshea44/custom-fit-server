'use strict';

const base64 = require('base-64');
const UserModel = require('../models/UserModel.js');

async function basicAuth(req, res, next) {
  if (!req.headers.authorization) {
    next('Invalid login');
  }

  let encodedCredentials = req.headers.authorization;
  let encodedBase64 = encodedCredentials.split(' ')[1];

  let decoded = base64.decode(encodedBase64);
  let [username, password] = decoded.split(':');
  let validUser = await UserModel.authenticateBasic(username, password);
  if (validUser) {
    req.user = validUser;
    next();
  } else {
    next('Invalid Login');
  }
}

module.exports = basicAuth;
