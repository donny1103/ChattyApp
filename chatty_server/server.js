const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  wss.broadcast(JSON.stringify({
    type:"counter",
    content: wss.clients.size})
  );

  console.log('Client connected');
  ws.on('message',(data)=>{
    const messageId = uuid();
    wss.broadcast(JSON.stringify(handleClientMessage(data, messageId)))
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast(JSON.stringify({
      type:"counter",
      content: wss.clients.size})
    );
    console.log('Client disconnected')
  });
});


// broadcast to all clients
wss.broadcast = data =>{
  wss.clients.forEach(client => {
    if (client.readyState === 1){
      client.send(data)
    }
  });
}

// handle message from client
const handleClientMessage = (message, messageId) => {
  let parsedMes = JSON.parse(message);
  console.log(parsedMes);
  switch(parsedMes.type){
    case "postMessage":
    return {
      type: "incomingMessage",
      id: messageId,
      username: parsedMes.username,
      content: parsedMes.content
    }
    case "postNotification":
    return {
      type: "incomingNotification",
      id: messageId,
      username: parsedMes.username,
      content: parsedMes.content
    }
    default:
    // show an error in the console if the message type is unknown
    throw new Error("Unknown event type " + parsedMes.type);
  }
}