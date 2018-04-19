'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('DeviceRentals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            deviceId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Devices',
                    key: 'id'
                },
                allowNull: false
            },
            renterId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                allowNull: false
            },
            returnCondition: {
                type: Sequelize.ENUM('good', 'usable', 'broken')
            },
            comment: {
                type: Sequelize.STRING
            },
            rentDate: {
                type: Sequelize.DATE
            },
            dueDate: {
                type: Sequelize.DATE
            },
            returnDate: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('DeviceRentals');
    }
};