var request = require('supertest');
var should = require('should');
const RESERVATIONS_API = '/api/reservations/';
describe('Testing GET reservations API', function() {
    var server;
    before(function() {
       server = require('../app');
    });
    it('responds to GET /api/reservations', function testSlash(done) {
        request(server)
            .get(RESERVATIONS_API)
            .expect(200, done);
    });
    it('responds to GET with id /api/reservations/1', function testSlash(done) {
        request(server)
            .get(RESERVATIONS_API + '1')
            .expect(200, done);
    });
    it('Sends back 500 with bad id /api/reservations/-1', function testSlash(done) {
        request(server)
            .get(RESERVATIONS_API + '-1')
            .expect(500, done);
    });
    it('Sends back 500 with non-numeric id /api/reservations/abcd', function testSlash(done) {
        request(server)
            .get(RESERVATIONS_API + 'abcd')
            .expect(500, done);
    });
    it('Sends back 500 with no reservations found /api/reservations/1000', function testSlash(done) {
        request(server)
            .get(RESERVATIONS_API + '1000')
            .expect(500, done);
    });
    after(function (done) {
        server.close();
        done();
    });
});
describe('Testing POST reservations API', function() {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to POST /api/reservations', function testSlash(done) {
        request(server)
            .post(RESERVATIONS_API)
            .send({"classroomId":0, "startDate":"1/1/1", "endDate":"1/1/1", "reservedBy":"test", "eventName":"testName"})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                    if (err) done(err);
                    res.body.should.be.instanceOf(Object);
                    done();
                })
    });
    it('responds with 500 for POST /api/reservations with wrong data', function testSlash(done) {
        request(server)
            .post(RESERVATIONS_API)
            .send({"blah":"0"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    it('responds with 500 for POST /api/reservations with empty data', function testSlash(done) {
        request(server)
            .post(RESERVATIONS_API)
            .send({})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    after(function (done) {
        server.close();
        done();
    });
});
describe('Testing DELETE reservations API', function() {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to DELETE /api/reservations/', function testSlash(done) {
        request(server)
            .delete(RESERVATIONS_API + '0')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body[0].should.have.property('active').and.is.equal(false);
                done();
            })
    });
    it('responds with 500 to DELETE /api/reservations/ with wrong id', function testSlash(done) {
        request(server)
            .delete(RESERVATIONS_API + '1000')
            .expect(500, done);
    });
    after(function (done) {
        server.close();
        done();
    });
});