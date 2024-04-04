'use strict';

const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sets: {
      type: String,
      required: false,
    },
    reps: {
      type: String,
      required: false,
    },
    weight: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    distance: {
      type: String,
      required: false,
    },
    isSuperset: {
      type: Boolean,
      default: false,
    },
    isDropset: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  { collection: 'exercises' }
);

const ExerciseModel = mongoose.model('Exercise', ExerciseSchema, 'exercises');

module.exports = ExerciseModel;
