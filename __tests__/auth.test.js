'use strict';

const supertest = require('supertest');
const app = require('../server.js').app;
const mongoose = require('mongoose');
const { UserModel } = require('../src/models');
const base64 = require('base-64');
require('dotenv').config();)

const request = supertest(app);

let testUser;

beforeAll(async () => {
  // Connect to the MongoDB database
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async() => {
  testUser = await UserModel.create({ username: 'test', password: 'test' });
});

afterEach(async() => {
  await UserModel.deleteOne({ username: 'test' });
});