var express = require('express');
var reservationsController = express.Router();

let data = {
    classrooms: [
        { id: 0, name: "CLASS-0", reservationStatus: "OPEN", noOfParticipants: 0, capacity: 30 },
        { id: 1, name: "CLASS-1", reservationStatus: "UNAVAILABLE", noOfParticipants: 12, capacity: 30 },
        { id: 2, name: "CLASS-2", reservationStatus: "RESERVED", noOfParticipants: 10, capacity: 20 }
    ],
    reservations: [
        { id: 0, classroom: this.classrooms[0], startDate: Date.now().toLocaleString(), endDate: Date.now().toLocaleString(), reservedBy: "test@email.com", status: "RESERVED"}
    ]
}

function findReservationByID(id) {
    for (var i = 0; i < data.reservations.length; i++) {
        if (data.reservations[i].id == id) {
            return data.reservations[i];
        }
    }
    return null;
}

function createNewReservations(classroomId, userName) {
    data.reservations.push({
        id: data.reservations.length,
        classroom: data.classrooms[classroomId],
        startDate: new Date.now().toLocaleDateString(),
        endDate: this.startDate,
        reservedBy: userName,
        status: "RESERVED",
    });
}

function cancelReservation(id) {
    for (var i = 0; i < data.reservations.length; i++) {
        if (data.reservations[i].id == id) {
            data.reservations = data.reservations.filter(item => item !== data.reservations[i]);
            break;
        }
    }
}

reservationsController.get('/', function (req, res) {
    res.json(data.reservations);
});

//Returns the reservation with of the requested id
reservationsController.get('/:id', function (req, res) {
    let devData = findReservationByID(req.params.id);
    if (devData) {
        res.json(devData);
    }
    else {
        res.status(500).send("Cannot find reservation.");
    }
});

//Cancels a reservation
reservationsController.delete('/', function (req, res) {
    if (req.body && req.body.id) {
        cancelReservation(req.params.id);
        res.json(data.reservations);
    }
    else {
        res.status(500).send("Missing information.");
    }
});
module.exports = reservationsController;