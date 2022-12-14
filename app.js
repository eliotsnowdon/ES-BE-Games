const express = require('express')

const {getCat, getReview, getRevById, getComFromId} = require('./controller.js')


const app = express()

app.get('/api/categories', getCat);
app.get('/api/reviews' , getReview);
app.get('/api/reviews/:review_id', getRevById);
app.get('/api/reviews/:review_id/comments', getComFromId);


app.all('/*', (req, res) => {
    res.status(404).send({ msg: 'Route not found' });
  });

app.use((err, req, res, next) => {
    if (err.msg && err.status) {
        res.status(err.status).send({ msg: err.err });
    }
    else {
        next(err)
    }
})
app.use((err, req, res, next) => {
    res.sendStatus(400)
})

app.use((err, req, res, next) => {
    res.sendStatus(500);
  });


  module.exports = app;