require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const { createUsers } = require('../utils/testUtils');

const should = chai.should();
chai.use(chaiHttp);

let users = [];
let singleConversationId = '';

before('Create Users', (done) => {
  users = createUsers(2);
  done();
});

const checkSingleConversation = (err, res) => {
  should.not.exist(err);
  res.should.have.status(200);

  res.body.should.contain.all.keys([
    'users',
    'messages',
    'created'
  ]);

  res.body.users.should.be.an('array').that.has.lengthOf(2);
};

describe('Conversations', () => {
  it('Creates a conversation', (done) => {
    chai.request(app)
      .post('/api/conversations/create')
      .send({ users: users.map((user) => user._id) })
      .end(((err, res) => {
        checkSingleConversation(err, res);
        singleConversationId = res.body._id;
        done();
      }));
  });

  it('Gets a single conversation', (done) => {
    chai.request(app)
      .get(`/api/conversations/${singleConversationId}`)
      .end((err, res) => {
        checkSingleConversation(err, res);
        done();
      })
  });

  it('Gets conversations for user', (done) => {
    chai.request(app)
      .post('/api/auth/authenticate')
      .send({ email: users[0].email, password: users[0].password })
      .end(((err, res) => {
        chai.request(app)
          .get(`/api/conversations?user=${users[0]._id}`)
          .set({ Authorization: `Bearer ${res.body.token}` })
          .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);

            res.body[0].should.contain.all.keys([
              'users',
              'messages',
              'created'
            ]);

            res.body[0].users.should.be.an('array').that.has.lengthOf(1);
            res.body[0].users[0]._id.should.equal(users[1]._id);
            done();
          });
      }));
  });
});