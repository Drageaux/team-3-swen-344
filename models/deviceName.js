'use strict';
module.exports = function (sequelize, DataTypes) {
    var DeviceName = sequelize.define('DeviceName', {
        name: DataTypes.STRING
    });
    Device.associate = function (models) {
        models.DeviceName.hasMany(models.Device, {
            onDelete: "CASCADE"
        });
    };
    return DeviceName;
};