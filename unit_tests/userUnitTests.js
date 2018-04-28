var request = require('supertest');
var should = require('should');
describe('Testing GET users API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to get /api/users/', function testSlash(done) {
        request(server)
            .get('/api/users/')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.have.property("users");
                res.body.should.have.property("status");
                done();
            })
    });
    it('responds to get /api/users/0', function testSlash(done) {
        request(server)
            .get('/api/users/0')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.have.property("users");
                res.body.should.have.property("status");
                done();
            })
    });
    it('responds to failure to get /api/users/a', function testSlash(done) {
        request(server)
            .get('/api/users/a')
            .expect(400)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) done(err);
                res.body.should.have.property("status");
                res.body.should.have.property("message");
                done();
            })
    });
    after(function (done) {
        server.close();
        done();
    });
});
describe('Testing POST users API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to POST /api/users/', function testSlash(done) {
        let randomString = makeid();
        request(server)
            .post('/api/users/')
            .send({"authId": randomString, "name": randomString + "test", "email": randomString + "test@test.test", "role": "admin"})
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    done(err);
                }
                res.body.should.have.property("user");
                res.body.should.have.property("status");
                done();
            })
    });
    it('responds to POST /api/users/ with missing field', function testSlash(done) {
        request(server)
            .post('/api/users/')
            .send({"authId": "15", "email": "test@test.test", "role": "admin"})
            .expect(500)
            .end(function(err, res) {
                res.body.should.have.property("message");
                res.body.should.have.property("status");
                done();
            })
    });
    after(function (done) {
        server.close();
        done();
    });
});

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
