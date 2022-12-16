const express = require('express')


const {getCat, getReview, getRevById, getComFromId, postComments, patchReview} = require('./controller.js')



const app = express()

app.get('/api/categories', getCat);
app.get('/api/reviews' , getReview);
app.get('/api/reviews/:review_id', getRevById);
app.get('/api/reviews/:review_id/comments', getComFromId);

app.use(express.json())
app.post('/api/reviews/:review_id/comments', postComments)
app.patch('/api/reviews/:review_id', patchReview)




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
  if(err.code === '23503'){
    res.status(404).send({msg: 'Route not found'})
  }
  else if(err.code === '23502' || err.code === '42703' || err.code === '22P02'){
    res.status(400).send({msg: 'Bad Request'})
  }
  else{
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.log(err)
    res.sendStatus(500);
  });


  module.exports = app;