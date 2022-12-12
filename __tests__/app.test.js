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
})