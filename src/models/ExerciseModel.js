'use strict';

const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: false,
    },
    reps: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    time: {
      type: Number,
      required: false,
    },
    distance: {
      type: Number,
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
  },
  { collection: 'exercises' }
);

const ExerciseModel = mongoose.model('Exercise', ExerciseSchema, 'exercises');

module.exports = ExerciseModel;
