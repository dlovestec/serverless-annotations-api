const express = require('express');
const annotationsRouter = require('./routes/annotations');

const app = express();
app.use(express.json());

app.use('/annotations', annotationsRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "serverless-annotations-api" });
});

module.exports = app;