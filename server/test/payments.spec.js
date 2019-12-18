require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const app = require('../app.js');
const db = require('../DbConnection');
const mongoose = require('mongoose');

chai.should();
chai.use(chaiHttp);

let userInfo, projectId;

before('Setup project and user', (done) => {
    db.open().then(() => {
      chai.request(app)
        .post(`/api/auth/register`)
        .send({ email: faker.internet.email(), name: faker.name.findName(), password: faker.internet.password() })
        .end((err, res) => {
          userInfo = res.body;
          chai.request(app)
            .post(`/api/projects`)
            .set({ Authorization: `Bearer ${userInfo.token}` })
            .send({
              'title': faker.lorem.word(),
              'description': faker.lorem.words(),
              'industry': faker.random.word(),
              'location': faker.address.state(),
              'fundingGoal': faker.random.number()
            })
            .end((err, res) => {
              projectId = res.body._id;
              done();
            });
        });
    }).catch(done);
  });

  after('Closes database connection', (done) => {
    db.close().then(() => done()).catch(done)
  });

describe('Investments', () => {
  it('Successful Investment', (done) => {
    chai
      .request(app)
      .post(`/api/investments/invest`)
      .set({ Authorization: `Bearer ${userInfo.token}` })
      .send({ projectId, token: { token: { id: 'tok_visa' } }, investmentAmount: 200 })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.investment.should.have.property('user').eql(userInfo.user._id);
        res.body.investment.should.have.property('project').eql(projectId);
        res.body.investment.should.have.property('value').eql(200);
        done();
      });
  });
});
