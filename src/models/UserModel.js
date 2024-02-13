'use strict';

const mongoose = require('mongoose');
const WorkoutModel = require('./WorkoutModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.TOKEN_SECRET || 'tokensecretfortesting';

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

UserSchema.virtual('token').get(function () {
  return jwt.sign({ username: this.username }, SECRET);
});

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

UserSchema.statics.authenticateBasic = async function (username, password) {
  let user = await this.findOne({ username });
  let valid = await bcrypt.compare(password, user.password);
  if (valid) {
    return user;
  } else {
    throw new Error('Invalid credentials');
  }
};

UserSchema.statics.authenticateToken = async function (token) {
  let parsedToken = jwt.verify(token, SECRET);
  const validUser = this.findOne({ username: parsedToken.username });
  if (validUser) {
    return validUser;
  } else {
    throw new Error('Invalid token');
  }
};

const UserModel = mongoose.model('User', UserSchema, 'users');

module.exports = UserModel;
