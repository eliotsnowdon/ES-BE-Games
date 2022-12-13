
const {selectCat,selectReview,selectReviewById, selectCommentById} = require('./model.js')

exports.getCat = (req, res, next) => {
    selectCat() .then((categories) => {
        res.status(200).send({categories})
    })
    .catch(err => {
        next(err)
    })
}

exports.getReview = (req, res, next) => {
    selectReview() .then((reviews) => {
        res.status(200).send({reviews})
    })
    .catch(err => {
        next(err)
    })
}

exports.getRevById = (req, res, next) => {
    const {review_id} = req.params
    selectReviewById(review_id).then((reviews) => {
    res.status(200).send({reviews})
  })
  .catch(err => {
    next(err)
  })
}

exports.getComFromId = (req, res, next) => {
    const {review_id} = req.params
    selectCommentById(review_id).then((comments) => {
        res.status(200).send({comments})
    })
    .catch(err => {
        next(err)
    })
}