const db = require('./db/connection.js')

exports.selectCat = () => {
    return db.query("SELECT * FROM categories")
    .then((result) => {
        return result.rows
    })
}

exports.selectReview = () => {
    let queryStr = "SELECT title, designer, owner, review_img_url, category,reviews.created_at, reviews.votes, reviews.review_id, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY title, designer, owner, review_img_url, category,reviews.created_at, reviews.votes, reviews.review_id ORDER BY created_at desc"
    return db.query(queryStr)
    .then((result) => {
         return result.rows
    })
}

exports.selectReviewById = (review_id) => {
    let queryStr = `SELECT * FROM reviews WHERE review_id = ${review_id}`
    return db.query(queryStr)
    .then((result) => {
        return (result.rows)
    })
}