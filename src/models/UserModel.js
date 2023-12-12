'use strict';

const mongoose = require('mongose');

const UserSchema = new mongoose.UserSchema({
  username: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
