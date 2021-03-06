const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;
const randomColor = require('random-color');
// Create a new express server
const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// handle message from client
const handleClientMessage = (message, messageId) => {
  let parsedMes = JSON.parse(message);
  switch (parsedMes.type) {
    case 'postMessage':
      return {
        type: 'incomingMessage',
        id: messageId,
        username: parsedMes.username,
        content: parsedMes.content,
        imgurls: parsedMes.imgurls,
        usernameColor: parsedMes.color,
      };
    case 'postNotification':
      return {
        type: 'incomingNotification',
        id: messageId,
        username: parsedMes.username,
        content: parsedMes.content,
        imgurls: parsedMes.imgurls,
      }
    default:
    // show an error in the console if the message type is unknown
      throw new Error('Unknown event type ' + parsedMes.type);
  }
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  // broadcast connected users
  wss.broadcast(JSON.stringify({
    type: 'counter',
    content: wss.clients.size,
  }));
  // generate random color for connected user
  ws.send(JSON.stringify({
    type: 'assignColor',
    color: randomColor().hexString(),
  }));

  // broadcast messages to all users
  ws.on('message', (data) => {
    const messageId = uuid();
    wss.broadcast(JSON.stringify(handleClientMessage(data, messageId)));
  });
  // Set up a callback for when a client closes the socket
  // This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast(JSON.stringify({
      type: 'counter',
      content: wss.clients.size,
    }));
    console.log('Client disconnected');
  });
});

// broadcast to all clients
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
};
