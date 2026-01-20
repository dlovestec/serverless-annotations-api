const express = require('express');
const annotationsRouter = require('./routes/annotations');

const app = express();
app.use(express.json());

app.use('/annotations', annotationsRouter);

module.exports = app;