'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

const exerciseRouter = require('./src/routes/exercise.js');
const workoutRouter = require('./src/routes/workout.js');
const authRouter = require('./src/routes/auth.js');
const bearerAuth = require('./src/middleware/bearer.js');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/exercise', exerciseRouter);
app.use('/workout', workoutRouter);
app.use(authRouter);

app.get('/secure', bearerAuth, (req, res) => {
  res.send({ data: req.user });
});

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT, () => console.log('Server is running on port ::', PORT));
  },
};
