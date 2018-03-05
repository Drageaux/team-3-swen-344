var express = require('express');
var messagingController = express.Router();

let data = {
  messages: [
    {id: 0, fromId: 22, toId: 15, dateCreated: "2018-03-01T03:24:00", title: "Lovely", message: "This message is lovely", deleted: false},
      {id: 1, fromId: 30, toId: 17, dateCreated: "2018-03-01T03:24:00", title: "Hate", message: "This message is full of hate", deleted: false},
      {id: 2, fromId: 12, toId: 12, dateCreated: "2018-03-01T03:24:00", title: "Betty White", message: "Don't mess with her", deleted: false},
      {id: 3, fromId: 14, toId: 22, dateCreated: "2018-03-01T03:24:00", title: "Jesus", message: "Bendelacreme", deleted: false}
  ]
};

function findMessagesByToId(id){
    let messaging = data.messages.filter(function(message) {
        return (message.toId == id && message.deleted == false);
    });

  return {
      messages: messaging
  }
}


function createMessage(message, fromId, toId, title){
  data.messages.push({
      fromId: fromId,
      toId: toId,
      dateCreated: Date.now().toString(),
      title: title,
      message: message,
      deleted: false,
      id: data.messages.length + 1
  });
}

function updateMessage(id, message, fromId, toId, title){
    for(var i = 0; i < data.messages.length; i += 1) {
        if (data.messages[i]['id'] === id) {
            data.messages[i]['message'] = message;
            data.messages[i]['fromId'] = fromId;
            data.messages[i]['toId'] = toId;
            data.messages[i]['title'] = title;
        }
    }
}

function deleteMessageByID(id){
    for(var i = 0; i < data.messages.length; i += 1) {
        if (data.messages[i]['id'] == id) {
            data.messages[i]['deleted'] = true;
        }
    }
}

//Returns all devices
messagingController.get('/', function (req, res){
  res.json(data.messages);
});

//Returns the device with of the requested id
messagingController.get('/to/:id', function(req, res){
  let messagingData = findMessagesByToId(req.params.id);
  if(messagingData.messages){
    res.json(messagingData);
  }
  else{
    res.status(500).send("Cannot find message.");
  }
});

//Add new message
messagingController.post('/', function (req, res) {
  if(req.body && req.body.message && Number.isInteger(req.body.fromId) && Number.isInteger(req.body.toId) && req.body.title){
    createMessage(req.body.message, req.body.fromId, req.body.toId, req.body.title);
    res.json(data.messages);
  }
  else {
    res.status(500).send("Missing information.");
  }
});

//Update message
messagingController.put('/', function (req, res) {
    console.log((req.body.id || 0));
  if(req.body && Number.isInteger(req.body.id) && req.body.message && Number.isInteger(req.body.fromId) && Number.isInteger(req.body.toId) && req.body.title){
    updateMessage(req.body.id, req.body.message, req.body.fromId, req.body.toId, req.body.title);
    res.json(data.messages);
  }
  else {
    res.status(500).send("Missing information.");
  }
});

//Deletes a device
messagingController.delete('/', function(req, res){
  if(req.body && Number.isInteger(req.body.id)){
    deleteMessageByID(req.body.id);
    res.json(data.messages);
  }
  else{
    res.status(500).send("Missing information.");
  }
});
module.exports = messagingController;
