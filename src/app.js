const express = require('express');
const apiRoutes = require('./routes/index');

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use('/', apiRoutes);

module.exports = app;
