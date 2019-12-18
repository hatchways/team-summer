require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const db = require('../DbConnection');
const { createUsers } = require('../utils/testUtils');

const should = chai.should();
chai.use(chaiHttp);

let users = [];

before('Connect to database', (done) => {
  db.open().then(() => {
    users = createUsers(2);
    done();
  }).catch(done);
});

after('Disconnect database', (done) => {
  db.close().then(() => done()).catch(done);
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