'use strict';
module.exports = function (sequelize, DataTypes) {
    var Participant = sequelize.define('Participant', {}, {});
    Participant.associate = function (models) {
        models.User.hasMany(models.Participant);
        models.ClassroomReservation.hasMany(models.Participant, {
            foreignKey: 'reservationId'
        });
    };
    return Participant;
};