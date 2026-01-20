const express = require('express');
const cors = require('cors');
const annotationsRouter = require('./routes/annotations');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/annotations', annotationsRouter);

module.exports = app;