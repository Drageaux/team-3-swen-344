var request = require('supertest');
var should = require('should');
require('dotenv').load();
const CLASSROOMS_API = '/api/classrooms/';
describe('Testing POST classrooms API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to POST /api/classrooms/', function testSlash(done) {
        request(server)
            .post(CLASSROOMS_API)
            .send({"location":"Unit Test", "capacity":2, "description":"unit test stuff"})
            .expect(200, done);
    });
    it('responds to POST /api/classrooms/ with missing field', function testSlash(done) {
        request(server)
            .post(CLASSROOMS_API)
            .send({})
            .expect(500, done);
    });
    after(function (done) {
        server.close();
        done();
    });
});

describe('Testing GET classrooms API', function () {
    var server;
    before(function (done) {
        server = require('../app');
        done();
    });
    it('responds to get /api/classrooms/', function testSlash(done) {
        request(server)
            .get(CLASSROOMS_API)
            .expect(200, done);
    });
    it('responds to GET with id /api/classrooms/1', function testSlash(done) {
        request(server)
            .get(CLASSROOMS_API +'1')
            .expect(200, done);
    });
    it('Sends back 500 with improper id /api/classrooms/-1', function testSlash(done) {
        request(server)
            .get(CLASSROOMS_API +'-1')
            .expect(500, done);
    });
    it('Sends back 500 with non-numeric id /api/classrooms/abcd', function testSlash(done) {
        request(server)
            .get(CLASSROOMS_API + 'abcd')
            .expect(500, done);
    });
    after(function (done) {
        server.close();
        done();
    });
});

describe('Testing DELETE classrooms API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to DELETE /api/classrooms/', function testSlash(done) {
        request(server)
            .delete(CLASSROOMS_API + '14')
            .expect(200, done);
    });
    it('responds to DELETE /api/classrooms/ with negative id', function testSlash(done) {
        request(server)
            .delete(CLASSROOMS_API +'-1')
            .expect(500, done);
    });
    it('responds to DELETE /api/classrooms/ with non-integer id', function testSlash(done) {
        request(server)
            .delete(CLASSROOMS_API + 'abcd')
            .expect(500, done);
    });
    it('responds to DELETE /api/classrooms/ with classroom that does not exist', function testSlash(done) {
        request(server)
            .delete(CLASSROOMS_API + '100')
            .expect(500, done);
    });
    after(function (done) {
        server.close();
        done();
    });
});
