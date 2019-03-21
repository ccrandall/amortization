let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
//let server = require('../bin/www');
let should = chai.should();

chai.use(chaiHttp);

describe("Index Route", function() {
  describe('/GET index', function() {
    it("should GET index page, return 200", function(done) {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          res.should.have.status(200);
          //res.body.length.should.be.eql(0);
          done();
        });
    });
    it("Index page should have title in h1", function(done) {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          res.text.should.include('Amortization Schedule');
          done();
        });
    });
    it("Index page should have form", function(done) {
      chai.request(app)
        .get('/')
        .end(function(err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });
});