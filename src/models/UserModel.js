'use strict';

const mongoose = require('mongoose');
const WorkoutModel = require('./WorkoutModel.js');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    workouts: [WorkoutModel.schema],
  },
  { collection: 'users' }
);

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
