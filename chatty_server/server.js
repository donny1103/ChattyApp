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

// Currently connected users
let messages = [];
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  const messageId = uuid();

  ws.on('message',(data)=>{
    ws.send(JSON.stringify(handleClientMessage(data,messageId)))
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});

// wss.broadcast = data =>{
//   wss.users.forEach(user => {
//     if (user && user.readyState === user.open){
//       user.send(data)
//     }
//   })
// }

// handle message from client
const handleClientMessage = (message,messageId) =>{
  let parsedMes = JSON.parse(message);
  return {
    id:messageId,
    username:parsedMes.username,
    content:parsedMes.content
  }
}