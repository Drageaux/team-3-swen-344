var request = require('supertest');
describe('loading express', function () {
    var server;
    beforeEach(function () {
        server = require('./app');
    });
    it('responds to get /api/messaging/', function testSlash(done) {
        request(server)
            .get('/api/messaging/')
            .expect(200, done);
    });
});