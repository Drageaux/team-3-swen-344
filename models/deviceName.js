'use strict';
module.exports = function(sequelize, DataTypes) {
    var DeviceName = sequelize.define('DeviceName', {
        // id: DataTypes.UUID,
        name: DataTypes.STRING
    });

    DeviceName.associate = function(models) {
        models.DeviceName.belongsTo(models.Device);
    };

    return DeviceName;
};