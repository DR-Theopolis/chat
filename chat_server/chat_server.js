const server = require("socket.io")
const io = new server.Server(3000)
io.on("connection", function (socket) {
    socket.on('new message', function (arg) {
        console.log(`New message: ${arg}`)
        io.emit('new message', {
            //username: socket.username,
            message: arg
          });
    })
});
