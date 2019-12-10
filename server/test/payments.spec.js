require('dotenv').config();
const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require('faker');
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/POST Invest", () => {
    let userInfo, projectId;
    before((done) => {
        chai.request(app)
            .post(`/api/auth/register`)
            .send({ email: faker.internet.email(), name: faker.name.findName(), password: faker.internet.password() })
            .end((err, res) => {
                userInfo = res.body;
                chai.request(app)
                    .post(`/api/projects`)
                    .set({ Authorization: `Bearer ${userInfo.token}` })
                    .send({
                        "title": faker.lorem.word(),
                        "description": faker.lorem.words(),
                        "industry": faker.random.word(),
                        "location": faker.address.state(),
                        "fundingGoal": faker.random.number()
                    })
                    .end((err, res) => {
                        projectId = res.body._id;
                        done();
                    });
            });
    });

    it("it should return 200 for successful investment", done => {
        chai
            .request(app)
            .post(`/api/investments/invest`)
            .set({ Authorization: `Bearer ${userInfo.token}` })
            .send({ projectId, token: { token:  {id: 'tok_visa'} }, investmentAmount: 2 })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.investment.should.have.property('user').eql(userInfo.user._id);
                res.body.investment.should.have.property('project').eql(projectId);
                res.body.investment.should.have.property('value').eql(200);
                done();
            });
    });
});
