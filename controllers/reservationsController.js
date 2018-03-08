var express = require('express');
var reservationsController = express.Router();

let classroomsData = {
    classrooms: [
        {id: 0, name: "CLASS-0", reservationStatus: "OPEN", noOfParticipants: 0, capacity: 30},
        {id: 1, name: "CLASS-1", reservationStatus: "UNAVAILABLE", noOfParticipants: 12, capacity: 30},
        {id: 2, name: "CLASS-2", reservationStatus: "RESERVED", noOfParticipants: 10, capacity: 20}
    ]
}
let data = {
    reservations: [
        { id: 0, classroom: classroomsData.classrooms[0], startDate: new Date().toLocaleDateString(), endDate: new Date().toLocaleDateString(), reservedBy: "test@email.com", active: true},
        { id: 1, classroom: classroomsData.classrooms[2], startDate: new Date().toLocaleDateString(), endDate: new Date().toLocaleDateString(), reservedBy: "test12345@email.com", active: true}
    ]
};

function findReservationByID(id) {
    for (var i = 0; i < data.reservations.length; i++) {
        if (data.reservations[i].id == id) {
            return data.reservations[i];
        }
    }
    return null;
}

function createNewReservations(classroomId) {
    newReservation = {
        id: data.reservations.length,
        classroom: classroomsData.classrooms[0],
        startDate: new Date().toLocaleDateString(),
        endDate: this.startDate,
        reservedBy: "testEmail123@email.com",
        active: true,
    }
    data.reservations.push(newReservation);
    return newReservation;
}

function cancelReservation(id) {
    for (var i = 0; i < data.reservations.length; i++) {
        if (data.reservations[i].id == id) {
            data.reservations[i].active = false;
            break;
        }
    }
}

//returns all reservations
reservationsController.get('/', function (req, res) {
    res.json(data.reservations);
});

//Returns the reservation with of the requested id
reservationsController.get('/:id', function (req, res) {
    let reservation = findReservationByID(req.params.id);
    if (reservation) {
        res.json(reservation);
    }
    else {
        res.status(500).send("Cannot find reservation.");
    }
});

//create a new reservation
reservationsController.post('/', function (req, res) {
    if(req.body && req.body.classroomId){
        res.json(createNewReservations(req.body.classroomId));
    }
    else {
        res.status(500).send("Bad Request");
    }
});

//Cancels a reservation
reservationsController.delete('/:id', function(req, res){
    let reservation = findReservationByID(req.params.id);
    if(reservation){
        cancelReservation(req.params.id);
        res.json(data.reservations);
    }
    else {
        res.status(500).send("Bad Request");
    }
});

module.exports = reservationsController;