const {selectCat, selectReview} = require('./model.js')

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