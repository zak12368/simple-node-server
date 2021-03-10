const { addUser, removeUser, getUser, getUserInRoom, disconnectUser, getGameRoom } = require('./services/connectionManager')
const { generatemsg } = require('./services/msgGenerator')
const express = require('express');
const app = express();
http = require("http");
const port = process.env.PORT || 4005;
let runningMessage = 'Websocket server started on port ' + port;
server = http.createServer(app);
let routes = require('./server/routes');

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});


var cors = require('cors');

const bodyParser = require('body-parser')

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

app.use('/', routes);


//when a websocket connection is established
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("joinRoom", ({ username, room }) => {
        addUser({ id: socket.id, username, room })


        socket.join(room);
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
        removeUser(username, room);
        socket.leave(room);

    })


    /*For real time drawing*/

    socket.on("mouseEvent", (ev) => {
        let e = JSON.parse(ev);
        if (e.roomId) {
            io.to(e.roomId).emit("mouseEvent", ev);
        }
    })

    socket.on("colorChange", (data) => {
        console.log(data)

        let room = getGameRoom(socket.id);
        console.log(room)

        io.to(room).emit("colorChange", data);
    })


    socket.on("toolChange", (data) => {
        console.log(data);
        let room = getGameRoom(socket.id);
        console.log(room);
        io.to(room).emit("toolChange", data);
    })
    socket.on("thicknessChange", (data) => {
        console.log(data);
        let room = getGameRoom(socket.id);
        console.log(room);
        io.to(room).emit("thicknessChange", data);
    })





    socket.on("allo", () => {
        io.emit("allo");
    })

    socket.on("disconnect", () => {
        disconnectUser(socket.id);
    });
});



server.listen(port, () => {
    console.log(runningMessage);
});

module.exports = server;