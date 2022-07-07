const server = require("socket.io")
const io = new server.Server(3000)



io.on("connection", function (socket) {
    //Read old messages from file.
    //Send all old messages to this new user.


    socket.on('new message', function (arg) {
        console.log(`New message: ${arg}`)

        let newMsg = {
            timestamp: Date.now(),
            userName: socket.username,
            msg: arg
        };

        //Append to file.

        socket.broadcast.emit('new message', {
            //username: socket.username,
            message: arg
          });
    })
});
