'use strict';

const express = require('express');
const basicAuth = require('../middleware/basic.js');
const { UserModel } = require('../models');
const router = express.Router();

// POST request to signup using basic auth
router.post('/signup', async (req, res) => {
  try {
    // create a user
  } catch (error) {
    // send error
  }
});

// POST request to signin using basic auth
router.post('/signin', basicAuth, async (req, res) => {
  // send status for success
});

modules.exports = router;
