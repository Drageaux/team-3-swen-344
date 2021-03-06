var request = require('supertest');
var should = require('should');
describe('Testing GET messaging API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to get /api/messaging/', function testSlash(done) {
        request(server)
            .get('/api/messaging/')
            .expect(200, done);
    });
    it('responds to GET with id /api/messaging/to/15', function testSlash(done) {
        request(server)
            .get('/api/messaging/to/15')
            .expect(200, done);
    });
    it('Sends back 500 with improper id /api/messaging/to/-1', function testSlash(done) {
        request(server)
            .get('/api/messaging/to/-1')
            .expect(500, done);
    });
    it('Sends back 500 with non-numeric id /api/messaging/to/abcd', function testSlash(done) {
        request(server)
            .get('/api/messaging/to/abcd')
            .expect(500, done);
    });
    it('Sends back 500 with no messages found /api/messaging/to/1000', function testSlash(done) {
        request(server)
            .get('/api/messaging/to/abcd')
            .expect(500, done);
    });
    after(function (done) {
        server.close();
        done();
    });
});
describe('Testing POST messaging API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to POST /api/messaging/', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"message": "This is askdjhaskjda", "fromId": 1, "toId": 1, "title": "WHAT IS HAPPENING"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.have.property("message");
                res.body.should.have.property("status");
                done();
            })
    });
    it('responds to POST /api/messaging/ with missing field', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"fromId": 1, "toId": 1, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    it('responds to POST /api/messaging/ toId NOT integer', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"message": "This is askdjhaskjda", "fromId": 10, "toId": "abc", "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    it('responds to POST /api/messaging/ fromId NOT integer', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"message": "This is askdjhaskjda", "fromId": "abc", "toId": 10, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    it('responds to POST /api/messaging/ with non-positive toId', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"message": "This is askdjhaskjda", "fromId": 10, "toId": -5, "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    it('responds to POST /api/messaging/ with non-positive fromId', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"message": "This is askdjhaskjda", "fromId": -1, "toId": 10, "title": "WHAT IS HAPPENING"})
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
describe('Testing PUT messaging API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to PUT /api/messaging/', function testSlash(done) {
        request(server)
            .put('/api/messaging/')
            .send({"id":26,"message": "This is askdjhaskjda", "title": "WHAT IS HAPPENING"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.have.property('status').which.equals(true);
                done();
            })
    });
    it('responds to PUT /api/messaging/ with missing field', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"id":26,  "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to PUT /api/messaging/ with id not an integer', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"id":26,"message": "This is askdjhaskjda",  "fromId": 1, "toId": "abc", "title": "WHAT IS HAPPENING"})
            .expect(500)
            .end(function(err, res) {
                if (err) done(err);
                done();
            })
    });
    it('responds to PUT /api/messaging/ with message not found', function testSlash(done) {
        request(server)
            .post('/api/messaging/')
            .send({"id":1 ,"message": "This is askdjhaskjda", "title": "WHAT IS HAPPENING"})
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
describe('Testing DELETE messaging API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to DELETE /api/messaging/', function testSlash(done) {
        request(server)
            .delete('/api/messaging/26')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.have.property('status').which.equals(true);
                done();
            })
    });
    it('responds to DELETE /api/messaging/ with ID not an integer', function testSlash(done) {
        request(server)
            .delete('/api/messaging/abcd')
            .expect(500)
            .end(function(err, res) {
                done();
            })
    });
    it('responds to DELETE /api/messaging/ with ID not found', function testSlash(done) {
        request(server)
            .delete('/api/messaging/-1')
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
