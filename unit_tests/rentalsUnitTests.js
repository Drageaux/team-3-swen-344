var request = require('supertest');
var should = require('should');
const RENTALS_API = '/api/rentals/';

//////////////////////
//Rentals Unit Tests//
//////////////////////
let resource;

//POST
describe('Testing POST rentals API', function() {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to POST /api/rentals', function testSlash(done) {
        request(server)
          .post(RENTALS_API)
          .send({"deviceId":8, "renterId":1, "rentDate":"2018-4-10T08:00:00", "dueDate":"2018-4-15T08:00:00"})
          .expect('Content-Type', /json/).expect(200).end(function(err, res) {
            if (err) done(err);
            res.body.should.be.instanceOf(Object);
            resource = res.body;
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
    after(function (done) {
        server.close();
        done();
    });
});

//GET
describe('Testing GET rentals API', function() {
    var server;
    before(function() {
       server = require('../app');
    });

    it('responds to GET /api/rentals', function testSlash(done) {
        request(server).get(RENTALS_API).expect(200, done);
    });
    it('responds to GET with id /api/rentals/:id', function testSlash(done) {
        request(server).get(RENTALS_API + resource.id).expect(200, done);
    });
    it('Sends back 500 with bad id /api/rentals/-1', function testSlash(done) {
        request(server).get(RENTALS_API + '-1').expect(500, done);
    });
    it('Sends back 500 with non-numeric id /api/rentals/abcd', function testSlash(done) {
        request(server)
            .get(RENTALS_API + 'abcd')
            .expect(500, done);
    });
    it('Sends back 500 with no rentals found /api/rentals/1000', function testSlash(done) {
        request(server).get(RENTALS_API + '1000').expect(500, done);
    });
    after(function (done) {
        server.close();
        done();
    });
});

//PUT
describe('Testing PUT messaging API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to PUT /api/rentals', function testSlash(done) {
        request(server)
          .put(RENTALS_API)
          .send({"id":resource.id, "returnCondition":"Good", "comment":"None", "returnDate":"2018-4-14T08:00:00"})
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if (err) done(err);
            res.body.should.be.instanceOf(Object);
            done();
          })
    });
    it('responds with 500 for PUT /api/rentals with wrong id', function testSlash(done) {
        request(server)
          .put(RENTALS_API)
          .send({"id":100, "returnCondition":"Good", "comment":"None", "returnDate":"2018-4-14T08:00:00"})
          .expect(500).end(function(err, res) {
            done();
          })
    });
    it('responds with 500 for PUT /api/rentals with wrong data', function testSlash(done) {
        request(server)
          .put(RENTALS_API+'return').send({"blah":"0"}).expect(500).end(function(err, res) {
            done();
          })
    });
    it('responds with 500 for PUT /api/rentals with empty data', function testSlash(done) {
        request(server)
          .put(RENTALS_API).send({}).expect(500).end(function(err, res) {
            done();
          })
    });
    after(function (done) {
        server.close();
        done();
    });
});

//DELETE
describe('Testing DELETE rentals API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to DELETE /api/rentals/', function testSlash(done) {
        request(server)
            .delete('/api/rentals/' + resource.id)
            .expect(200, done);
            /*.expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.have.property('id').and.is.equal(1);
                done();
            })*/
    });
    it('responds to DELETE /api/rentals/ with negative id', function testSlash(done) {
        request(server)
            .delete('/api/rentals/-1')
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to DELETE /api/rentals/ with non-integer id', function testSlash(done) {
        request(server)
            .delete('/api/rentals/abcd')
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to DELETE /api/rentals/ with device that does not exist', function testSlash(done) {
        request(server)
            .delete('/api/rentals/100')
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    after(function (done) {
        server.close();
        done();
    });
});
