'use strict';

const express = require('express');
const basicAuth = require('../middleware/basic.js');
const UserModel = require('../models/UserModel.js');
const router = express.Router();

// POST request to signup using basic auth
router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
    let newUser = await UserModel.ceate(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Something went wrong with /signup', error);
    res.status(400).send('Bad Request');
  }
});

// POST request to signin using basic auth
router.post('/signin', basicAuth, async (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
