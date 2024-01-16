'use strict';

const express = require('express');
const mongoose = require('mongoose');

const WorkoutModel = require('../models/WorkoutModel.js');
const router = express.Router();

router.use(express.json());

// CREATE a workout
router.post('/', async (req, res) => {
  let { name, exercises = [] } = req.body;
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
router.get('/:workoutId', async (req, res) => {
  const { workoutId } = req.params;
  try {
    let documents = await WorkoutModel.findById(workoutId);
    res.json(documents);
  } catch (error) {
    console.error('Error ', error);
    res.status(500).send('Internal Server Error');
  }
});

// UPDATE a workout
router.patch('/:workoutId', async (req, res) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    res.status(400).send('Invalid workout Id.');
    return;
  }

  try {
    const updatedData = req.body;

    let documents = await WorkoutModel.findByIdAndUpdate(
      workoutId,
      updatedData,
      { new: true }
    );

    if (!documents) {
      res.status(404).send('Workout not found');
    } else {
      res.json(documents);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE a workout

module.exports = router;
