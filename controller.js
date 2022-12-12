const {selectCat} = require('./model.js')

exports.getCat = (req, res, next) => {
    selectCat() .then((categories) => {
        res.status(200).send({categories})
    })
    .catch(err => {
        next(err)
    })
}