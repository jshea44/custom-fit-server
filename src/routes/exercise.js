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

// READ an exercise
router.get('/:exerciseId', async (req, res) => {
  const { exerciseId } = req.params;
  try {
    let documents = await ExerciseModel.findById(exerciseId);
    res.json(documents);
  } catch (error) {
    console.error('Error: ', error);
    res.status(500).send('Internal Server Error');
  }
});

// UPDATE a exercise
router.patch('/:exerciseId', async (req, res) => {
  const { exerciseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
    res.status(400).send('Invalid exercise Id.');
    return;
  }

  try {
    const updatedData = req.body;

    let documents = await ExerciseModel.findByIdAndUpdate(
      exerciseId,
      updatedData,
      { new: true }
    );

    if (!documents) {
      res.status(404).send('Exercise not found');
    } else {
      res.json(documents);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE an exercise
router.delete('/:exerciseId', async (req, res) => {
  const { exerciseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(exerciseId)) {
    res.status(400).send('Invalid exercise Id.');
    return;
  }

  try {
    let result = await ExerciseModel.findByIdAndDelete(exerciseId);
    if (!result) {
      res.status(404).send('Exercise not found');
    } else {
      res.status(204).send('Exercise deleted successfully.');
    }
  } catch (error) {
    console.error('Error', error);
    res.status(501);
  }
});

module.exports = router;
