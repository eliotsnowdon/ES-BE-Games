\c nc_games_test

SELECT * FROM comments
JOIN reviews ON comments.review_id = reviews.review_id
WHERE comments.review_id = 2

