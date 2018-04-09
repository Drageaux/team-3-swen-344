'use strict';
module.exports = function (sequelize, DataTypes) {
    var ClassroomReservation = sequelize.define('ClassroomReservation', {
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        eventName: DataTypes.STRING
    }, {});
    ClassroomReservation.associate = function (models) {
        models.ClassroomReservation.belongsTo(models.Classroom);
        models.ClassroomReservation.belongsTo(models.User, {as: 'ReservedBy'});
    };
    return ClassroomReservation;
};