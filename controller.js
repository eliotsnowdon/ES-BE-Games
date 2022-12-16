
const {selectCat,selectReview,selectReviewById, selectCommentById, insertComment, updateReview} = require('./model.js')

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
    const promises = [selectCommentById(review_id),selectReviewById(review_id)]
    Promise.all(promises)
    .then(([comments]) => {
        res.status(200).send({comments})
    })
    .catch(err => {
        next(err)
    })
}

exports.postComments = (req, res, next) => {
    insertComment(req.body, req.params.review_id)
    .then((comments) => {
        res.status(201).send({comments})
    })
    .catch(err => {
        next(err)
    })
}

exports.patchReview = (req, res, next) => {
    const {review_id} = req.params
    const {voteInc} = req.body
    updateReview(review_id, voteInc)
    .then((review) => {
        res.status(200).send({review})
    })
    .catch(err => {
        next(err)
    })
}