'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const exerciseRouter = require('./src/routes/exercise.js');

app.use(cors());
app.use(express.json());
app.use('/exercise', exerciseRouter);

app.listen(PORT, () => {
  console.log('Server is running on port ::', PORT);
});
