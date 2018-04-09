'use strict';
module.exports = function (sequelize, DataTypes) {
    var Device = sequelize.define('Device', {
        type: DataTypes.STRING,
        serial: DataTypes.STRING
    });
    Device.associate = function (models) {
        models.Device.belongsTo(models.DeviceName, {
            onDelete: "CASCADE"
        });
    };
    return Device;
};