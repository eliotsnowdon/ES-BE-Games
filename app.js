const express = require('express')

const {getCat, getReview} = require('./controller.js')

const app = express()

app.get('/api/categories', getCat);
app.get('/api/reviews' , getReview);

app.all('/*', (req, res) => {
    res.status(404).send({ msg: 'Route not found' });
  });
  
  app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
  });

  module.exports = app;