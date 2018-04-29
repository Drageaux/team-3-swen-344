var express = require('express');
var classroomsController = express.Router();

//Returns all classrooms
classroomsController.get('/', function (req, res) {
    if (req.body) {
        models.Classroom.findAll({
            attributes: ['id', 'location', 'capacity', 'description'],
            include: [
                {
                    model: models.ClassroomReservation,
                    as: 'reservation',
                    attributes: ['classroomId', 'active'],
                    required: false,
                    where: {
                        active: 1
                    }
                }
            ]
        }).then(function (classrooms) {
            res.json(classrooms);
        }).catch((error) => {
            console.log(error);
        })
    }
    else {
        res.status(500).send("Bad request");
    }
});

//Returns the classroom with of the requested id
classroomsController.get('/:id', function (req, res) {
    if (Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) >= 0) {
        models.Classroom.findOne({
            attributes: ['id', 'location', 'capacity', 'description'],
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: models.ClassroomReservation,
                    as: 'reservation',
                    attributes: ['classroomId', 'active'],
                    required: false
                }
            ]
        }).then(function (classrooms) {
            res.json(classrooms);
        }).catch((error) => {
            console.log(error);
        })
    }
    else {
        res.status(500).send("Invalid Classroom Id.");
    }
});

//Add new classroom
classroomsController.post('/', function (req, res) {
    if (req.body && req.body.description && req.body.location) {
        models.Classroom.create({
            location: req.body.location,
            capacity: req.body.capacity,
            description: req.body.description
        }).then((classroom) => {
            if (classroom) {
                res.json({
                    classroom: classroom
                })
            }
        })
    }
    else {
        res.status(500).send("Invalid or missing information.");
    }
});

//Deletes a classroom
classroomsController.delete('/:id', function (req, res) {
    if(Number.isInteger(parseInt(req.params.id)) && req.params.id >= 0){
        models.Classroom.find({
            where: {
                id: parseInt(req.params.id)
            }
        }).then((classroom) => {
            if(classroom) {
                classroom.destroy().then(function() {
                    res.status(200).send("classroom deleted.");
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

module.exports = classroomsController;
