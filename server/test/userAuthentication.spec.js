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
    db.close().then(() => done()).catch(done)
  });

  it('Registers a user', (done) => {
    let userInfo;

    chai.request(app)
      .post('/api/auth/register')
      .send({ email: faker.internet.email(), name: faker.name.findName(), password: faker.internet.password() })
      .end((err, res) => {
        userInfo = res.body;
        res.should.have.status(201);
        done()
      });
  });
});