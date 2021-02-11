const express = require('express');
const app = express();
http = require("http");
WebSocket = require("ws");
const port = process.env.PORT || 4005;
let runningMessage = 'Websocket server started on port ' + port;
server = http.createServer(app)
websocketServer = new WebSocket.Server({ server });

app.get('/', (req, res) => {
  console.log('API was successfully requested');
  res.send(runningMessage);
});

//when a websocket connection is established
websocketServer.on('connection', (webSocketClient) => {
  //send feedback to the incoming connection
  webSocketClient.send('{ "connection" : "ok"}');

  //when a message is received
  webSocketClient.on('message', (message) => {

      //for each websocket client
      websocketServer
          .clients
          .forEach(client => {
              //send the client the current message
              client.send(`{ "message" : ${message} }`);
          });
  });
});

server.listen(port, () => {
  console.log(runningMessage);
});

module.exports = server;
