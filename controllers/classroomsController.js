var express = require('express');
var classroomsController = express.Router();

let data = {
    classrooms: [
        { id: 0, capacity: 200, location: "GOL-1400", description: "A large auditorium"},
        { id: 1, capacity: 30, location: "GAN-1337", description: "An art studio" },
        { id: 2, capacity: 20, location: "GOS-2550", description: "A chemistry lab" }
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
classroomsController.get('/', function (req, res) {
    res.json(data.classrooms);
});

//Returns the classroom with of the requested id
classroomsController.get('/:id', function (req, res) {
    let devData = findClassroomByID(req.params.id);
    if (devData) {
        res.json(devData);
    }
    else {
        res.status(500).send("Cannot find classroom.");
    }
});

//Add new classroom
classroomsController.post('/', function (req, res) {
    if (req.body && req.body.newName) {
        addNewClassroom(req, body.newName);
        res.json(data.classrooms);
    }
    else {
        res.status(500).send("Missing information.");
    }
});

//Update classroom
classroomsController.put('/', function (req, res) {
    if (req.body && req.body.id && req.body.newName) {
        updateClassroom(req.body.id, req.body.newName);
        res.json(data.classrooms);
    }
    else {
        res.status(500).send("Missing information.");
    }
});

//Deletes a classroom
classroomsController.delete('/', function (req, res) {
    if (req.body && req.body.id) {
        deleteClassroomByID(req.params.id);
        res.json(data.classrooms);
    }
    else {
        res.status(500).send("Missing information.");
    }
});
module.exports = classroomsController;
