'use strict';
module.exports = function (sequelize, DataTypes) {
    var Device = sequelize.define('Device', {
        type: DataTypes.STRING,
        serial: DataTypes.STRING
    }, {});
    Device.associate = function (models) {
        // associations can be defined here
    };
    return Device;
};