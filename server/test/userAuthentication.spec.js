require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const app = require('../app.js');
const mongoose = require('mongoose');

chai.should();
chai.use(chaiHttp);

// before('Setup project and user', (done) => {
//   // Clear test  database
//   const connection = mongoose.connection;
//   connection.once('open', () => connection.db.dropDatabase());

describe('User authentication and creation', () => {
  before('Setup project and user', (done) => {
    // Clear test  database
    const connection = mongoose.connection;
    connection.once('open', () => connection.db.dropDatabase());
  });

  it('Registers a user', (done) => {
    let userInfo;

    chai.request(app)
      .post('/api/auth/register')
      .send({ email: faker.internet.email(), name: faker.name.findName(), password: faker.internet.password() })
      .end((err, res) => {
        userInfo = res.body
        res.status.should.have.status(200)
      });
  });
});