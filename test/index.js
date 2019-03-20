let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
//let server = require('../bin/www');
let should = chai.should();

chai.use(chaiHttp);

describe("Index Route", () => {
  describe('/GET index', () => {
    it("should show form on index page", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body);
          //res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});