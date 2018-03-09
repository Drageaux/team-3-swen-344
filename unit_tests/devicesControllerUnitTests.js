var request = require('supertest');
var should = require('should');

///////////////////////////////
//Device Controller Unit Test//
///////////////////////////////
///GET
describe('Testing GET devices API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to get /api/devices/', function testSlash(done) {
        request(server)
            .get('/api/devices/')
            .expect(200, done);
    });
    it('responds to GET with id /api/devices/1', function testSlash(done) {
        request(server)
            .get('/api/devices/1')
            .expect(200, done);
    });
    it('Sends back 500 with improper id /api/devices/-1', function testSlash(done) {
        request(server)
            .get('/api/devices/-1')
            .expect(500, done);
    });
    it('Sends back 500 with non-numeric id /api/devices/abcd', function testSlash(done) {
        request(server)
            .get('/api/devices/abcd')
            .expect(500, done);
    });
    it('Sends back 500 with no messages found /api/devices/100', function testSlash(done) {
        request(server)
            .get('/api/devices/100')
            .expect(500, done);
    });
    after(function () {
        server.close();
    });
});

//POST
describe('Testing POST devices API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to POST /api/devices/', function testSlash(done) {
        request(server)
            .post('/api/devices/')
            .send({"name": "Foo"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.be.instanceOf(Object);
                done();
            })
    });
    it('responds to POST /api/devices/ with missing field', function testSlash(done) {
        request(server)
            .post('/api/devices/')
            .send({})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    after(function () {
        server.close();
    });
});

//PUT
describe('Testing PUT devices API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to PUT /api/devices/', function testSlash(done) {
        request(server)
            .put('/api/devices/')
            .send({"id":1,"name": "Foo"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body[1].should.have.property('name').which.equals("Foo");
                done();
            })
    });
    it('responds to PUT /api/devices/ with missing field', function testSlash(done) {
        request(server)
            .put('/api/devices/')
            .send({"id":1})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to PUT /api/devices/ with non-integer id', function testSlash(done) {
        request(server)
            .put('/api/devices/')
            .send({"id": "abc","name": "Foo"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to PUT /api/devices/ with negative id', function testSlash(done) {
        request(server)
            .put('/api/devices/')
            .send({"id": -1,"name": "Foo"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    it('responds to PUT /api/devices/ with device that does not exist', function testSlash(done) {
        request(server)
            .put('/api/devices/')
            .send({"id": 100,"name": "Foo"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    after(function () {
        server.close();
    });
});

//DELETE
describe('Testing DELETE devices API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to DELETE /api/devices/', function testSlash(done) {
        request(server)
            .delete('/api/devices/0')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body[0].should.have.property('id').and.is.equal(1);
                done();
            })
    });
    it('responds to DELETE /api/devices/ with negative id', function testSlash(done) {
        request(server)
            .delete('/api/devices/-1')
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to DELETE /api/devices/ with non-integer id', function testSlash(done) {
        request(server)
            .delete('/api/devices/abcd')
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to DELETE /api/devices/ with device that does not exist', function testSlash(done) {
        request(server)
            .delete('/api/devices/100')
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    after(function () {
        server.close();
    });
});
