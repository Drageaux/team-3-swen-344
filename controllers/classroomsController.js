var express = require('express');
var classroomsController = express.Router();

let data = {
    classrooms: [
        { id: 0, capacity: 200, location: "GOL-1400", description: "A large auditorium" },
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

function addNewClassroom(newDescription) {
    newClassroom = {
        id: data.classrooms.length,
        description: newDescription
    }
    data.classrooms.push(newClassroom);
    return newClassroom;
}

function updateClassroom(id, newDescription) {
    var dev = findClassroomByID(id);
    if (dev) {
        dev.description = newDescription;
        return dev;
    }
    else {
        return null;
    }

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
    if (Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) >= 0) {
        let devData = findClassroomByID(req.params.id);
        if (devData) {
            res.json(devData);
        }
        else {
            res.status(500).send("Cannot find classroom.");
        }
    }
    else {
        res.status(500).send("Invalid Input.");
    }
});

//Add new classroom
classroomsController.post('/', function (req, res) {
    if (req.body && req.body.description) {
        res.json(addNewClassroom(req.body.description));
    }
    else {
        res.status(500).send("Missing information.");
    }
});

//Update classroom
classroomsController.put('/', function (req, res) {
    if (req.body && req.body.id && Number.isInteger(req.body.id) && req.body.id >= 0 && req.body.description) {
        let updatedClassroom = updateClassroom(req.body.id, req.body.description);
        if (updatedClassroom) {
            res.json(data.classrooms);
        }
        else {
            res.status(500).send("Classroom not found.");
        }
    }
    else {
        res.status(500).send("Invalid or missing information.");
    }
});

//Deletes a classroom
classroomsController.delete('/:id', function (req, res) {
    if (Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) >= 0) {
        let devData = findClassroomByID(req.params.id);
        if (devData) {
            deleteClassroomByID(req.params.id);
            res.json(data.classrooms);
        }
        else {
            res.status(500).send("Classroom not found.");
        }
    }
    else {
        res.status(500).send("Invalid or missing information.")
    }
});

module.exports = classroomsController;
