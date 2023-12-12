'use strict';

const mongoose = require('mongoose');
const ExerciseModel = require('./ExerciseModel.js');

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  exercises: [ExerciseModel.schema],
});

const WorkoutModel = mongoose.model('Workout', WorkoutSchema);

module.exports = WorkoutModel;
