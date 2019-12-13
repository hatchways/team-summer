require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const app = require('../app.js');
const db = require('../DbConnection');
const mongoose = require('mongoose');

chai.should();
chai.use(chaiHttp);

describe('User authentication and creation', () => {
  before('Connect to database', (done) => {
    db.open().then(() => done()).catch(done);
  });

  after('Disconnect database', (done) => {
    db.close().then(() => done()).catch(done);
  });

  let userInfo;
  const fakePassword = faker.internet.password();

  it('Registers a user', (done) => {
    chai.request(app)
      .post('/api/auth/register')
      .send({ email: faker.internet.email(), name: faker.name.findName(), password: fakePassword })
      .end((err, res) => {
        userInfo = res.body;
        res.should.have.status(201);
        res.body.should.have.property('token');
        res.body.should.have.property('user');
        res.body.user.should.have.all.keys(['_id', 'email', 'name']);
        done();
      });
  });

  it('User logs in', (done) => {
    chai.request(app)
      .post('/api/auth/authenticate')
      .send({ email: userInfo.user.email, password: fakePassword })
      .set({ Authorization: `Bearer ${userInfo.token}` })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.keys('token', 'user');
        res.body.user.should.have.all.keys([
          '_id',
          'email',
          'name',
          'projects',
          'investments'
        ]);
        done();
      });
  });
});