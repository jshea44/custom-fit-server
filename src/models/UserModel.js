'use strict';

const mongoose = require('mongoose');
const WorkoutModel = require('./WorkoutModel.js');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
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

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
