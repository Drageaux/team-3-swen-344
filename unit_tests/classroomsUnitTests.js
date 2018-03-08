var request = require('supertest');
var should = require('should');
describe('Testing GET classroom API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    //INSERT IN UNIT TESTS
    after(function () {
        server.close();
    });
});
describe('Testing POST classroom API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    //INSERT IN UNIT TESTS
    after(function () {
        server.close();
    });
});
describe('Testing PUT classroom API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    //INSERT UNIT TESTS IN HERE
    after(function () {
        server.close();
    });
});
describe('Testing DELETE classroom API', function () {
    var server;
    before(function () {
        server = require('../app');
    });
    //INSERT UNIT TESTS IN HERE
    after(function () {
        server.close();
    });
});
