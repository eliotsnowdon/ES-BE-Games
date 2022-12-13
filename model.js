const db = require('./db/connection.js')

exports.selectCat = () => {
    return db.query("SELECT * FROM categories")
    .then((result) => {
        return result.rows
    })
}

exports.selectReviewById = (review_id) => {
    let queryStr = `SELECT * FROM reviews WHERE review_id = ${review_id}`
    return db.query(queryStr)
    .then((result) => {
        return (result.rows[0])
    })
}