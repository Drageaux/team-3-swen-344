'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('Users', 'name', {type: Sequelize.STRING})
            .then(function () {
                return queryInterface.addColumn('Users', 'role', {
                    type: Sequelize.ENUM('admin', 'instructor', 'proxy', 'student')
                });
            });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.remove('Users', 'name').then(function () {
            return queryInterface.remove('Users', 'role');
        });
    }
};
