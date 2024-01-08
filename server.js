'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3001;

const exerciseRouter = require('./src/routes/exercise.js');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/exercise', exerciseRouter);

app.listen(PORT, () => {
  console.log('Server is running on port ::', PORT);
});
