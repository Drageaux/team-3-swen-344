'use strict';
module.exports = function (sequelize, DataTypes) {
    var DeviceName = sequelize.define('DeviceName', {
        name: DataTypes.STRING
    });

    return DeviceName;
};