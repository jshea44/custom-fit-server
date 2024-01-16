'use strict';

const mongoose = require('mongoose');
const ExerciseModel = require('./ExerciseModel.js');

const WorkoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    exercises: [ExerciseModel.schema],
  },
  { collection: 'workouts' }
);

const WorkoutModel = mongoose.model('Workout', WorkoutSchema, 'workouts');

module.exports = WorkoutModel;
