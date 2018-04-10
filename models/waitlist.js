'use strict';
module.exports = function (sequelize, DataTypes) {
    var WaitList = sequelize.define('WaitList', {
        position: DataTypes.INTEGER
    }, {});
    WaitList.associate = function (models) {
        models.WaitList.belongsTo(models.User);
        models.WaitList.belongsTo(models.Device);
    };
    return WaitList;
};