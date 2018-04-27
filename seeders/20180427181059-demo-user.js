'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                authId: 0,
                role: 'admin',
                name: 'Tom',
                email: 'tom@ritmail.com'
            },
            {
                authId: 1,
                role: 'admin',
                name: 'David',
                email: 'david@ritmail.com'
            },
            {
                authId: 2,
                role: 'admin',
                name: 'Nate',
                email: 'nate@ritmail.com'
            },
            {
                authId: 3,
                role: 'admin',
                name: 'Ian',
                email: 'ian@ritmail.com'
            },
            {
                authId: 4,
                role: 'admin',
                name: 'Jethro',
                email: 'jethro@ritmail.com'
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};