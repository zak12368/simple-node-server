const express = require('express');
const app = express();
http = require("http");
WebSocket = require("ws");
const port = process.env.PORT || 4005;
let runningMessage = 'Websocket server started on port ' + port;
server = http.createServer(app)
websocketServer = new WebSocket.Server({ server });
var cors = require('cors');

const bodyParser = require('body-parser')
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors({
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'x-access-token', 'XSRF-TOKEN'],
  preflightContinue: false
}))

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
              client.send(`${message}`);
          });
  });
});

app.get('/users', db.getUsers)
app.get('/users/:username', db.getUserByUsername)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

server.listen(port, () => {
  console.log(runningMessage);
});

module.exports = server;
