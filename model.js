const db = require('./db/connection.js')

exports.selectCat = () => {
    return db.query("SELECT * FROM categories")
    .then((result) => {
        return result.rows
    })
}

exports.selectReviewById = () => {
    return db.query(`SELECT * FROM reviews WHERE review_id = ${review_id};`)
    .then((result) => {
        return result.rows[0]
    })
}