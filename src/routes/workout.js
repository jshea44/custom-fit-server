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
    res.json(document);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Internal Server Error');
  }
});

// READ all workouts
router.get('/', async (req, res) => {
  try {
    let documents = await WorkoutModel.find({});
    res.json(documents);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Internal Server Error');
  }
});

// READ a single workout

// UPDATE a workout

// DELETE a workout

module.exports = router;
