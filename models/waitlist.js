'use strict';
module.exports = function (sequelize, DataTypes) {
    var WaitList = sequelize.define('WaitList', {
        position: DataTypes.INTEGER
    }, {});
    WaitList.associate = function (models) {
        // associations can be defined here
    };
    return WaitList;
};