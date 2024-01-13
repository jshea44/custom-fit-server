'use strict';

const express = require('express');
const mongoose = require('mongoose');

const WorkoutModel = require('../models/WorkoutModel.js');
const router = express.Router();

router.use(express.json());

// CREATE a workout
router.post('/', async (req, res) => {
  let { name, exercises } = req.body;
  let workout = new WorkoutModel({
    name,
    exercises,
  });
  try {
    let document = await workout.save();
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Internal Server Error');
  }
});

// READ all workouts

// READ a single workout

// UPDATE a workout

// DELETE a workout

module.exports = router;
