'use strict';
module.exports = function (sequelize, DataTypes) {
    var ClassroomReservation = sequelize.define('ClassroomReservation', {
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        eventName: DataTypes.STRING,
        active: DataTypes.TINYINT,
    }, {});
    ClassroomReservation.associate = function (models) {
        models.ClassroomReservation.belongsTo(models.Classroom, {as: 'classroom'});
        models.ClassroomReservation.belongsTo(models.User, {as: 'reservedby'});
    };
    return ClassroomReservation;
};