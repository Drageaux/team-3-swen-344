'use strict';
module.exports = function (sequelize, DataTypes) {
    var DeviceName = sequelize.define('DeviceName', {
        name: DataTypes.STRING
    }, {});
    DeviceName.associate = function (models) {
        models.DeviceName.hasMany(models.Device);
    };
    return DeviceName;
};