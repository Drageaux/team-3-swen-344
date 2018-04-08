'use strict';
module.exports = function(sequelize, DataTypes) {
    var Device = sequelize.define('Device', {
        // id: DataTypes.UUID,
        // deviceNameId: DataTypes.UUID,
        type: DataTypes.STRING,
        serial: DataTypes.STRING
    });

    Device.associate = function(models) {
        models.Device.hasOne(models.DeviceName);
    };

    return Device;
};