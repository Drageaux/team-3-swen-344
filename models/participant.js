'use strict';
module.exports = function (sequelize, DataTypes) {
    var Participant = sequelize.define('Participant', {}, {});
    Participant.associate = function (models) {
        models.User.hasMany(model.Participant);
        models.ClassroomReservation.hasMany(model.Participant, {
            foreignKey: 'reservationId'
        });
    };
    return Participant;
};