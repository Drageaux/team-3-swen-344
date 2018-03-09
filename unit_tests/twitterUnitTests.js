var request = require('supertest');
var should = require('should');

describe('Testing GET twitter API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    it('responds to get /api/twitter/', function testSlash(done) {
        request(server)
            .get('/api/twitter/')
            .expect(200, done);
    });
    it('responds to get /api/twitter?count=2', function testSlash(done) {
        request(server)
            .get('/api/twitter?count=2')
            .expect(200, done);
    });
    it('sends back 500 with improper count /api/twitter?count=-1', function testSlash(done) {
        request(server)
            .get('/api/twitter?count=-1')
            .expect(500, done);
    });
    after(function () {
        server.close();
    });
});