const fs = require('fs');
const server = require("socket.io");
const io = new server.Server(3000);
function appendUserToFile (user) {
    if (fs.readFileSync("users.txt",
        {encoding:'utf8', flag:'r'}).includes(user)) {
            return;
        } else {
            fs.appendFileSync("users.txt", `${user}\r\n`);
        }
}
io.on("connection", function (socket) {
    socket.on('new user', function(arg) {
        console.log(arg);
        appendUserToFile(arg);
        const file = fs.readFileSync('messages.txt',
        {encoding:'utf8', flag:'r'})
        socket.emit('new message', {
            message: file
          });
    socket.on('new message', function (arg) {
        fs.appendFileSync("messages.txt", `${arg}`);
        socket.broadcast.emit('new message', {
            message: arg
          });
    })
      socket.on('stream',function(data){
        socket.broadcast.emit('stream',data);
    });
})});
