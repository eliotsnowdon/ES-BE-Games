const {selectCat,selectReview,selectReviewById} = require('./model.js')

exports.getCat = (req, res, next) => {
    selectCat() .then((categories) => {
        res.status(200).send({categories})
    })
    .catch(err => {
        next(err)
    })
}

exports.getRev = (req, res, next) => {
    selectReview() .then((reviews) => {
        res.status(200).send({reviews})
    })
    .catch(err => {
        next(err)
    })
}

exports.getRevById = (req, res, next) => {
    const {review_id} = req.params
    console.log(review_id)
    selectReviewById(review_id).then((review) => {
    res.status(200).send({review})
  })
  .catch(err => {
    next(err)
  })
}