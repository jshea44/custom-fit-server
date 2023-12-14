'use strict';

const express = require('express');
const mongoose = require('mongoose');

const ExerciseModel = require('../models/ExerciseModel.js');
const router = express.Router();

router.use(express.json());

// CREATE a exercise
router.post('/', async (req, res) => {
  let { name, sets, reps, weight, time, distance, isSuperset, isDropset } =
    req.body;
  let exercise = new ExerciseModel({
    name,
    sets,
    reps,
    weight,
    time,
    distance,
    isSuperset,
    isDropset,
  });
  try {
    let document = await exercise.save();
    res.json(document);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Internal Server Error');
  }
});

// READ all exercises
router.get('/', async (req, res) => {
  try {
    let documents = await ExerciseModel.find({});
    res.json(documents);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// UPDATE a exercise

// DELETE a exercise

module.exports = router;
