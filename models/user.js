'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        authId: DataTypes.STRING,
        role: DataTypes.ENUM('admin', 'instructor', 'proxy', 'student'),
        name: DataTypes.STRING,
        email: DataTypes.STRING
    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};