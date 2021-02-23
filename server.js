const { addUser, removeUser, getUser, getUserInRoom } = require('./services/connectionManager')
const { generatemsg } = require('./services/msgGenerator')

const express = require('express');
const app = express();
http = require("http");
const port = process.env.PORT || 4005;
let runningMessage = 'Websocket server started on port ' + port;
server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:4200",
    }
});


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
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("joinRoom", ({ username, room }) => {
        addUser({ id: socket.id, username, room })

        socket.join(room)
            // socket.emit("message", generatemsg("Admin ,Welcome"))
            // socket.broadcast.to(room).emit("message", `Admin ${user.username} has joined!`);




    })

    socket.on("sendMessage", (msg) => {
        let mess = JSON.parse(msg);
        if (mess.roomId) {
            console.log("room:", mess.roomId, "msg:", mess.message);
            io.to(mess.roomId).emit("message", msg)
        }
    })

    socket.on("leaveRoom", (username, room) => {
        const user = removeUser(username, room)
            // console.log(user, 'diconnected')
            // if (user) {
            //     io.to(room).emit("message", generatemsg(`Admin ${user.username} A user  has left`))
            // }

    })

    socket.on("disconnect", () => {
        const user = removeUser(username, 'Clobal');
    });
});




app.get('/users', db.getUsers)
app.get('/users/:username', db.getUserByUsername)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:username', db.deleteUser)

app.post('/connectedUsers', db.addConnectedUsers)
app.get('/connectedUsers', db.getConnectedUsers)
app.delete('/connectedUsers/:username', db.removeConnectedUser)
app.get('/connectedUsers/:username', db.getConnectedUser)
app.delete('/connectedSockets/:socketId', db.deleteBySocket)

server.listen(port, () => {
    console.log(runningMessage);
});

module.exports = server;