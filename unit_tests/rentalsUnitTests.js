var request = require('supertest');
var should = require('should');
const RENTALS_API = '/api/rentals/';

//////////////////////
//Rentals Unit Tests//
//////////////////////

//GET
describe('Testing GET rentals API', function() {
    var server;
    before(function() {
       server = require('../app');
    });

    it('responds to GET /api/rentals', function testSlash(done) {
        request(server).get(RENTALS_API).expect(200, done);
    });

    it('responds to GET with id /api/rentals/1', function testSlash(done) {
        request(server).get(RENTALS_API + '1').expect(200, done);
    });
    it('Sends back 500 with bad id /api/rentals/-1', function testSlash(done) {
        request(server).get(RENTALS_API + '-1').expect(500, done);
    });
    it('Sends back 500 with non-numeric id /api/rentals/abcd', function testSlash(done) {
        request(server)
            .get(RENTALS_API + 'abcd')
            .expect(500, done);
    });
    it('Sends back 500 with no reservations found /api/rentals/1000', function testSlash(done) {
        request(server).get(RENTALS_API + '1000').expect(500, done);
    });
    after(function () {
        server.close();
    });
});

//POST
describe('Testing POST rentals API', function() {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to POST /api/rentals', function testSlash(done) {
        request(server)
          .post(RENTALS_API)
          .send({"deviceId":2, "renterId":1, "rentDate":"2018-4-10T08:00:00", "dueDate":"2018-4-15T08:00:00"})
          .expect('Content-Type', /json/).expect(200).end(function(err, res) {
            //if (err) done(err);
            res.body.should.be.instanceOf(Object);
            done();
          })
    });
    it('responds with 500 for POST /api/rentals with wrong data', function testSlash(done) {
        request(server)
          .post(RENTALS_API).send({"blah":"0"}).expect(500).end(function(err, res) {
            done();
          })
    });
    it('responds with 500 for POST /api/rentals with empty data', function testSlash(done) {
        request(server)
          .post(RENTALS_API).send({}).expect(500).end(function(err, res) {
            done();
          })
    });
    after(function () {
        server.close();
    });
});

//PUT
describe('Testing PUT messaging API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to PUT /api/rentals/return', function testSlash(done) {
        request(server)
          .post(RENTALS_API+'/return')
          .send({"id":1, "returnCondition":"Good", "comment":"None", "returnDate":"2018-4-14T08:00:00"})
          .expect('Content-Type', /json/).expect(200).end(function(err, res) {
            //if (err) done(err);
            res.body.should.be.instanceOf(Object);
            done();
          })
    });
    it('responds with 500 for PUT /api/rentals/return with wrong data', function testSlash(done) {
        request(server)
          .post(RENTALS_API+'/return').send({"blah":"0"}).expect(500).end(function(err, res) {
            done();
          })
    });
    it('responds with 500 for PUT /api/rentals/return with empty data', function testSlash(done) {
        request(server)
          .post(RENTALS_API+'/return').send({}).expect(500).end(function(err, res) {
            done();
          })
    });
    after(function () {
        server.close();
    });
});
