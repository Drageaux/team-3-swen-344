'use strict';
module.exports = function (sequelize, DataTypes) {
    var Message = sequelize.define('Message', {
        title: DataTypes.STRING,
        body: DataTypes.STRING,
        deleted: DataTypes.BOOLEAN
    }, {});
    Message.associate = function (models) {
        models.Message.belongsTo(models.User, {as: 'from'});
        models.Message.belongsTo(models.User, {as: 'to'});
    };
    return Message;
};