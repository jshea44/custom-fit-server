'use strict';

const supertest = require('supertest');
const app = require('../server.js').app;
const mongoose = require('mongoose');
const UserModel = require('../src/models/UserModel');
const base64 = require('base-64');
require('dotenv').config();

const request = supertest(app);

let testUser;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // await mongoose.connection.close();
  // await app.close();
  await mongoose.disconnect();
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

  test('Should be able to login to existing user on POST /signin', async () => {
    let encodedCredentials = base64.encode('Test:test123');
    let response = await request.post('/signin').set({
      Authorization: `Basic ${encodedCredentials}`,
    });
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('Test');
  });

  test('Token can be exchanged for secure data', async () => {
    let response = await request.get('/secure').set({
      Authorization: `Bearer ${testUser.token}`,
    });
    expect(response.status).toBe(200);
    expect(response.body.data.username).toEqual('test');
  });
});
