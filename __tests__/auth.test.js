'use strict';

const supertest = require('supertest');
const app = require('../server.js');
const mongoose = require('mongoose');
const UserModel = require('../src/models/UserModel');
const base64 = require('base-64');
require('dotenv').config();

const request = supertest(app.app);

let testUser;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await app.close();
});

beforeEach(async () => {
  testUser = await UserModel.create({ username: 'test', password: 'test' });
});

afterEach(async () => {
  await UserModel.deleteOne({ username: 'test' });
});

describe('Testing the auth workflow', () => {
  test('Should be able to register a user on POST /signup', async () => {
    let response = await request.post('/signup').send({
      username: 'Test',
      password: 'test123',
    });

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.username).toBe('Test');
  });
});
