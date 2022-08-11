const fs = require('fs')
const server = require("socket.io")
const io = new server.Server(3000)
io.on("connection", function (socket) {
    socket.on('new user', function() {
        const file = fs.readFileSync('/Users/error/Desktop/git-chat/messages.txt',
        {encoding:'utf8', flag:'r'})
        console.log(file);
        socket.emit('new message', {
            message: file
          });
    socket.on('new message', function (arg) {
        fs.appendFileSync("messages.txt", `${arg}<br>\r\n`);
        console.log(`New message: ${arg}`)
        socket.broadcast.emit('new message', {
            message: arg
          });
    })
})});
