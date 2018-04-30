var express = require('express');
var reservationsController = express.Router();

//models for talking to DB
models = require("../models");

//returns all reservations
reservationsController.get('/', function (req, res) {

    models.ClassroomReservation.findAll({
        attributes: ['id', 'startDate', 'endDate', 'eventName', 'active'],
        include: [
            {
                model: models.Classroom,
                as: 'classroom',
                attributes: ['id', 'location'],
                required: true
            },
            {
                model: models.User,
                as: 'reservedby',
                attributes: ['id', 'name', 'email'],
                required: true
            }
        ]
    }).then(function(reservations){
        res.json(reservations);
    }).catch((error) => {
        console.log(error);
    });
});

//Returns the reservation with of the requested id
reservationsController.get('/:id', function (req, res) {
    if (Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) >= 0){
        models.ClassroomReservation.findOne({
            attributes: ['startDate', 'endDate', 'eventName', 'active'],
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: models.Classroom,
                    as: 'classroom',
                    attributes: ['id', 'location'],
                    required: true
                },
                {
                    model: models.User,
                    as: 'reservedby',
                    attributes: ['id'],
                    required: true
                }
            ]
        }).then(function(reservation) {
            if (reservation) {
                res.json(reservation);
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Invalid Classroom"
                });
            }
        })
    }
    else {
        res.status(500).send("Invalid Input.");
    }
});

//create a new reservation
reservationsController.post('/', function (req, res) {
    if (req.body) {
        models.Classroom.findOne({
            where: {
                id: req.body.classroomId
            }
        }).then(function(classroom) {
            if (classroom != null) {
                models.ClassroomReservation.create({
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    eventName: req.body.eventName,
                    active: 1,
                    classroomId: classroom.id,
                    reservedbyId: parseInt(req.body.reservedbyId)
                }).then((reservation) => {
                    if (reservation) {
                        res.json({
                            reservation: reservation
                        })
                    }
                })
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "Invalid Classroom"
                })
            }
        })
    }
    else {
        res.status(500).json({
            status: false,
            message: "Missing input information"
        });
        console.log("missing info");
    }
});

reservationsController.put('/:id', function(req, res){
    if(Number.isInteger(parseInt(req.params.id)) && req.params.id >= 0){
        models.ClassroomReservation.find({
            where: {
                id: parseInt(req.params.id)
            }
        }).then((reservation) => {
            if(reservation) {
                reservation.update( {
                    active: 0
                });
                res.status(200).json(reservation);
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "No reservation found"
                });
            }
        });
    }
    else {
        res.status(500).json({
            status: false,
            message: "Missing input information"
        });
    }
});

reservationsController.delete('/:id', function(req, res){
    if(Number.isInteger(parseInt(req.params.id)) && req.params.id >= 0){
        models.ClassroomReservation.find({
            where: {
                id: parseInt(req.params.id)
            }
        }).then((reservation) => {
            if(reservation) {
                reservation.destroy().then(function() {
                    res.status(200).send("reservation deleted.");
                });
            }
            else {
                res.status(500).json({
                    status: false,
                    message: "No reservation found"
                });
            }
        });
    }
    else {
        res.status(500).json({
            status: false,
            message: "Missing input information"
        });
    }
});

module.exports = reservationsController;