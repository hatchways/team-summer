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

  it('Fails when user is not logged in', (done) => {

  });

  it('Creates projects when user is logged in and responds with 200', (done) => {

  });

  it('Fails when user does not include a required field (title, industry, location, fundingGoal,', (done) => {

  });
});