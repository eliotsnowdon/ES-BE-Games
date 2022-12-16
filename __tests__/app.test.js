const request = require('supertest');
const app = require('../app');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js')
const testData = require('../db/data/test-data')

beforeEach(() => {
  return seed(testData)
})

afterAll(() => {
  if (db.end) db.end();
});

describe('3. GET /api/categories', () => {
  test('status:200, responds with an array of categories objects', () => {
    return request(app)
      .get('/api/categories')
      .expect(200)
      .then(({ body }) => {
        const {categories} = body;
        expect(categories).toBeInstanceOf(Array);
        expect(categories).toHaveLength(4);
        categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug:expect.any(String),
              description:expect.any(String)
            })
          );
        });
      });
  });
  describe('incorrect route testing', () => {
   //Unhappy path  route not found 404
   test('status:404, responds with msg: "Route not found"', () =>{
    return request(app)
    .get('/ap')
    .expect(404)
    .then(({body}) =>{
        expect(body.msg).toBe("Route not found");
    })
})
})
})
describe('4. Get reviews', () => {
  test('status:200, responds with an array of categories objects', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then(({ body }) => {
        const {reviews} = body;
        expect(reviews).toBeInstanceOf(Array);
        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              title:expect.any(String),
              designer:expect.any(String),
              owner:expect.any(String),
              review_img_url:expect.any(String),
              category:expect.any(String),
              created_at:expect.any(String),
              votes:expect.any(Number),
              comment_count:expect.any(String),
              review_id:expect.any(Number)
            })
          );
        });
      });
    })

test('status:200, responds with an array of categories objects is in desc order', () => {
  return request(app)
    .get('/api/reviews')
    .expect(200)
    .then(({ body }) => {
      const {reviews} = body;
      expect(reviews).toBeInstanceOf(Array);
      expect(reviews).toBeSortedBy('created_at',{descending:true});
      
    });
      });
    
describe('5-get reviews by Id', () => {
  test('status:200 returns object as expected', () => {
    return request(app)
      .get('/api/reviews/1')
      .expect(200)
      .then(({ body }) => {
        const {reviews} = body;
        reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              title:expect.any(String),
              designer:expect.any(String),
              owner:expect.any(String),
              review_img_url:expect.any(String),
              category:expect.any(String),
              created_at:expect.any(String),
              votes:expect.any(Number),
              review_id:expect.any(Number),
              review_body:expect.any(String)
            })
          );
        });
      });
  })
  test('valid id not database', () => {
    return request(app)
    .get('/api/reviews/3000')
    .expect(404)
  })
})

    });
 describe('6-get comments by Id', () => {
      test('status:200 returns array of comments as expected from specific Id', () => {
        return request(app)
          .get('/api/reviews/2/comments')
          .expect(200)
          .then(({ body }) => {
            const {comments} = body;
          comments.forEach((com) => {
            expect(com).toEqual(
              expect.objectContaining({
                review_id:expect.any(Number),
                comment_id:expect.any(Number),
                votes:expect.any(Number),
                created_at:expect.any(String),
                author:expect.any(String),
                body:expect.any(String),
              })
            )
          })
      })
    })
    test('that the returned item is in descending order', () => {
      return request(app)
    .get('/api/reviews/2/comments')
    .expect(200)
    .then(({ body }) => {
      const {comments} = body;
      expect(comments).toBeInstanceOf(Array);
      expect(comments).toBeSortedBy('created_at',{descending:true});
      
    });
    })
    test('valid id but no comments', () => {
      return request(app)
      .get('/api/reviews/1/comments')
      .expect(200)
      .then(({ body }) => {
        const {comments} = body;
        expect(comments).toEqual([])
      })
    })
    test('invalid id', () => {
      return request(app)
      .get('/api/reviews/bananna/comments')
      .expect(400)
    })
    test('valid id with no existing number', () => {
      return request(app)
      .get('/api/reviews/9999/comments')
      .expect(404)
    })
  })
describe('7-post', () => {
  test('status:201 adds comments to path', () => {
    newComment = {
      username: "mallionaire",
      body:"i am him"
    }
    return request(app)
    .post('/api/reviews/3/comments')
    .send(newComment)
    .expect(201)
    .then(({ body }) => {
      expect(body.comments).toEqual(
        expect.objectContaining({
          author: 'mallionaire',
          body: "i am him",
          author:expect.any(String),
          comment_id:expect.any(Number),
          created_at:expect.any(String),
          review_id:expect.any(Number),
          votes:expect.any(Number)
        })
      );
    });
  })
  test('adds comments to invalid username', () => {
    newComment = {
      username: "jambo",
      body:"i am him"
    }
    return request(app)
    .post('/api/reviews/3/comments')
    .send(newComment)
    .expect(404)
  })
  test('adds comments to invalid path', () => {
    newComment = {
      username: "mallionaire",
      body:"i am him"
    }
    return request(app)
    .post('/api/reviews/hello/comments')
    .send(newComment)
    .expect(400)
  })
  test('adds comments to invalid comment', () => {
    newComment = {
      body:"i am him"
    }
    return request(app)
    .post('/api/reviews/3/comments')
    .send(newComment)
    .expect(400)
  })
  test('adds comments to valid id that doesnt exist', () => {
    newComment = {
      username: "mallionaire",
      body:"i am him"
    }
    return request(app)
    .post('/api/reviews/300/comments')
    .send(newComment)
    .expect(404)
  })
})

describe('8-patch', () => {
  test('status 200 with positive number', () => {
    const voteInc = {voteInc: 5}
    return request(app)
    .patch('/api/reviews/3')
    .send(voteInc)
    .expect(200)
    .then(({body}) => {
      expect(body.review).toEqual(
        expect.objectContaining({
          votes: 10,
          category:expect.any(String),
          created_at:expect.any(String),
          review_id:expect.any(Number),
          designer:expect.any(String),
          owner:expect.any(String),
          review_id: 3,
          review_img_url:expect.any(String),
          title:expect.any(String),
          review_body:expect.any(String)
        })
      )

    })

  })
  test('adds to invalid review_id', () => {
    const voteInc = {voteInc: 5}
    return request(app)
    .patch('/api/reviews/hello')
    .send(voteInc)
    .expect(400)
  })
  test('adds to valid id but with no contence', () => {
    const voteInc = {voteInc: 5}
    return request(app)
    .patch('/api/reviews/300')
    .send(voteInc)
    .expect(404)
  })
  test('invalid increment type for voteInc', () => {
    const voteInc = {voteInc: 'dog'}
    return request(app)
    .patch('/api/reviews/3')
    .send(voteInc)
    .expect(400)
  })
})
