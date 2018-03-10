var request = require('supertest');
var should = require('should');
require('dotenv').load();

describe('Testing GET classrooms API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to get /api/classrooms/', function testSlash(done) {
        request(server)
            .get('/api/classrooms/')
            .expect(200, done);
    });
    it('responds to GET with id /api/classrooms/1', function testSlash(done) {
        request(server)
            .get('/api/classrooms/1')
            .expect(200, done);
    });
    it('Sends back 500 with improper id /api/classrooms/-1', function testSlash(done) {
        request(server)
            .get('/api/classrooms/-1')
            .expect(500, done);
    });
    it('Sends back 500 with non-numeric id /api/classrooms/abcd', function testSlash(done) {
        request(server)
            .get('/api/classrooms/abcd')
            .expect(500, done);
    });
    it('Sends back 500 with no messages found /api/classrooms/100', function testSlash(done) {
        request(server)
            .get('/api/classrooms/100')
            .expect(500, done);
    });
    after(function () {
        server.close();
    });
});
describe('Testing POST classrooms API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to POST /api/classrooms/', function testSlash(done) {
        request(server)
            .post('/api/classrooms/')
            .send({ "description": "Foo" })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.instanceOf(Object);
                done();
            })
    });
    it('responds to POST /api/classrooms/ with missing field', function testSlash(done) {
        request(server)
            .post('/api/classrooms/')
            .send({})
            .expect(500)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            })
    });
    after(function () {
        server.close();
    });
});
describe('Testing PUT classrooms API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to PUT /api/classrooms/', function testSlash(done) {
        request(server)
            .put('/api/classrooms/')
            .send({ "id": 1, "description": "Foo" })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
                if (err) return done(err);
                res.body[1].should.have.property('description').which.equals("Foo");
                done();
            })
    });
    it('responds to PUT /api/classrooms/ with missing field', function testSlash(done) {
        request(server)
            .put('/api/classrooms/')
            .send({ "id": 1 })
            .expect(500)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            })
    });
    it('responds to PUT /api/classrooms/ with non-integer id', function testSlash(done) {
        request(server)
            .put('/api/classrooms/')
            .send({ "id": "abc", "description": "Foo" })
            .expect(500)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            })
    });
    it('responds to PUT /api/classrooms/ with negative id', function testSlash(done) {
        request(server)
            .put('/api/classrooms/')
            .send({ "id": -1, "description": "Foo" })
            .expect(500)
            .end(function (err, res) {
                done();
            })
    });
    it('responds to PUT /api/classrooms/ with classroom that does not exist', function testSlash(done) {
        request(server)
            .put('/api/classrooms/')
            .send({ "id": 100, "description": "Foo" })
            .expect(500)
            .end(function (err, res) {
                done();
            })
    });
    after(function () {
        server.close();
    });
});
describe('Testing DELETE classrooms API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to DELETE /api/classrooms/', function testSlash(done) {
        request(server)
            .delete('/api/classrooms/0')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body[0].should.have.property('id').and.is.equal(1);
                done();
            })
    });
    it('responds to DELETE /api/classrooms/ with negative id', function testSlash(done) {
        request(server)
            .delete('/api/classrooms/-1')
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
    });
    it('responds to DELETE /api/classrooms/ with non-integer id', function testSlash(done) {
        request(server)
            .delete('/api/classrooms/abcd')
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to DELETE /api/classrooms/ with classroom that does not exist', function testSlash(done) {
        request(server)
            .delete('/api/classrooms/100')
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                done();
            })
    });
    after(function () {
        server.close();
    });
});
