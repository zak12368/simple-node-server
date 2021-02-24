var connections = [];
const addUser = ({ id, username, room }) => {

    // //vlidate data
    // if (!username || !room) {
    //     return {
    //         error: 'Username and room are required!'
    //     }
    // }

    // //check for existing users
    // const existingUser = connections.find((user) => {
    //     return user.room == room && user.username == username;
    // })

    // //va;idate username
    // if (existingUser) {
    //     return {
    //         error: "username iss already used"
    //     }
    // }

    //store user
    const user = { id, username, room };
    connections.push(user);
    console.log(connections);
    return { user };
}


const removeUser = (username, room) => {
    const index = connections.findIndex((user) => {
        return (user.username === username && user.room === room);
    })
    if (index !== -1) {
        console.log(connections);
        return connections.splice(index, 1)[0];
    }

}
const disconnectUser = (socketId) => {
    connections = connections.filter((user) => {
        user.id === socketId;
    });
    console.log(socketId, 'left');
    console.log(connections);
}

const getUser = (id) => {
    return connections.find((user) => {
        return user.id === id;
    })
}

const getUserInRoom = (room) => {
    const u = [];
    connections.filter((user) => {

        user.room === room;
    })
    console.log(connections);
    return connections;

}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom,
    disconnectUser
}