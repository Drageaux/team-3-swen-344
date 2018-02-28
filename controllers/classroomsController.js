var express = require('express');
var classroomsController = express.Router();

let data = {
    classrooms: [
        { id: 0, name: "CLASS-0", reservationStatus: "OPEN", noOfParticipants: 0, capacity: 30 },
        { id: 1, name: "CLASS-1", reservationStatus: "UNAVAILABLE", noOfParticipants: 12, capacity: 30 },
        { id: 2, name: "CLASS-2", reservationStatus: "RESERVED", noOfParticipants: 10, capacity: 20 }
    ]
}

function findClassroomByID(id) {
    for (var i = 0; i < data.classrooms.length; i++) {
        if (data.classrooms[i].id == id) {
            return data.classrooms[i];
        }
    }
    return null;
}

function findClassroomByName(name) {
    for (var i = 0; i < data.classrooms.length; i++) {
        if (data.classrooms[i].name.toLowerCase() == name.toLowerCase()) {
            return data.classrooms[i];
        }
    }
    return null;
}

function addNewClassroom(newName) {
    data.classrooms.push({
        id: data.classrooms.length,
        name: newName,
        reservationStatus: "OPEN",
        noOfParticipants: 0,
        capacity: 30 // default capacity
    });
}

function updateClassroom(id, newName) {
    var dev = findClassroomByID(id);
    dev.name = newName;
}

function deleteClassroomByID(id) {
    for (var i = 0; i < data.classrooms.length; i++) {
        if (data.classrooms[i].id == id) {
            data.classrooms = data.classrooms.filter(item => item !== data.classrooms[i]);
            break;
        }
    }
}


//Returns all classrooms
classroomController.get('/', function (req, res) {
    res.json(data.classrooms);
});

//Returns the classroom with of the requested id
classroomController.get('/:id', function (req, res) {
    let devData = findClassroomByID(req.params.id);
    if (devData) {
        res.json(devData);
    }
    else {
        res.status(500).send("Cannot find classroom.");
    }
});

//Add new classroom
classroomController.post('/', function (req, res) {
    if (req.body && req.body.newName) {
        addNewClassroom(req, body.newName);
        res.json(data.classrooms);
    }
    else {
        res.status(500).send("Missing information.");
    }
});

//Update classroom
classroomController.put('/', function (req, res) {
    if (req.body && req.body.id && req.body.newName) {
        updateClassroom(req.body.id, req.body.newName);
        res.json(data.classrooms);
    }
    else {
        res.status(500).send("Missing information.");
    }
});

//Deletes a classroom
classroomController.delete('/', function (req, res) {
    if (req.body && req.body.id) {
        deleteClassroomByID(req.params.id);
        res.json(data.classrooms);
    }
    else {
        res.status(500).send("Missing information.");
    }
});
module.exports = classroomsController;
