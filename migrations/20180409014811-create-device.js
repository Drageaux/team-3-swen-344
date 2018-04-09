'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Devices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            deviceName: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'DeviceNames',
                    key: 'id'
                },
                allowNull: false
            },
            type: {
                type: Sequelize.STRING
            },
            serial: {
                type: Sequelize.STRING
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
        return queryInterface.dropTable('Devices');
    }
};