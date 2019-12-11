const chai = require('chai');
const chaiHttp = require('chai-http');
require('dotenv').config();
const app = require('../app.js');

chai.should();
chai.use(chaiHttp);

describe('Connection test', () => {
  it('Request should return 400', (done) => {
    chai
      .request(app)
      .post(`/ping/`)
      .send({ teamName: 'Shums' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property('response')
          .eql('Shums is not part of the team. Modify your .env');
        done();
      });
  });
});