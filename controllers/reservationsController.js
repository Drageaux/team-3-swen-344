var express = require('express');
var reservationsController = express.Router();

let classroomsData = {
    classrooms: [
        { id: 0, capacity: 200, location: "GOL-1400", description: "A large auditorium"},
        { id: 1, capacity: 30, location: "GAN-1337", description: "An art studio" },
        { id: 2, capacity: 20, location: "GOS-2550", description: "A chemistry lab" }
    ]
}
let data = {
    reservations: [
        { id: 0, classroomId: classroomsData.classrooms[0].id, startDate: new Date().toLocaleDateString(), endDate: new Date().toLocaleDateString(), reservedBy: "test@email.com", active: true, eventName: "CSCI-141", participants: 72},
        { id: 1, classroomID: classroomsData.classrooms[2].id, startDate: new Date().toLocaleDateString(), endDate: new Date().toLocaleDateString(), reservedBy: "test12345@email.com", active: true, eventName: "FNRT-200", participants: 21}
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

function createNewReservations(classroomId, startDate, endDate, reservedBy, active, eventName, participants) {
    console.log("reservationController");
    newReservation = {
        id: data.reservations.length,
        classroomId: classroomId,
        startDate: startDate,
        endDate: endDate,
        reservedBy: reservedBy,
        active: active,
        eventName: eventName,
        participants: participants,
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
    console.log("RESERVATIONS CONTROLLER!!!!");
    if(req.body){
        res.json(createNewReservations(req.body.classroomId, req.body.startData, req.body.endDate, req.body.reservedBy, req.body.eventName, req.body.participants));
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