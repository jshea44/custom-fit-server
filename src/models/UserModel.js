'use strict';

const mongoose = require('mongoose');
const WorkoutModel = require('./WorkoutModel.js');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    workouts: [WorkoutModel.schema],
  },
  { collection: 'users' }
);

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
