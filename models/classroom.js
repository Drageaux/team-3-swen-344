'use strict';
module.exports = function (sequelize, DataTypes) {
    var Classroom = sequelize.define('Classroom', {
        location: DataTypes.STRING,
        capacity: DataTypes.INTEGER,
        description: DataTypes.STRING
    }, {});
    Classroom.associate = function (models) {
        // associations can be defined here
    };
    return Classroom;
};