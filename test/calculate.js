let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
//let server = require('../bin/www');
let should = chai.should();

chai.use(chaiHttp);

describe("Calculate Route", function() {
    describe('/POST calculate', function() {
        it("should POST to calculate and return 200", function(done) {
            let date = new Date();
            let displayDate =  date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
            chai.request(app)
            .post('/calculate')
            .type('form')
            .send({
                _method: 'post',
                'param[principal]' : 10000,
                'param[term]' : 4,
                'param[interest_rate]' : 3,
                'param[start_date]' :  displayDate
            })
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
        });
    });
});