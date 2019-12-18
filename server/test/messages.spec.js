require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const { createUsers } = require('../utils/testUtils');

const should = chai.should();
chai.use(chaiHttp);

let users = [];

before('Create Users', (done) => {
  users = createUsers(2);
  done();
});

describe('Messages', () => {
  it('Creates a conversation', (done) => {
    chai.request(app)
      .post('/api/conversations/create')
      .send({ users: users.map((user) => user._id) })
      .end(((error, res) => {
        should.not.exist(error);
        res.should.have.status(200);
        res.body.should.contain.all.keys([
          'users',
          'messages',
          'created'
        ]);
        done();
      }));
  });
});