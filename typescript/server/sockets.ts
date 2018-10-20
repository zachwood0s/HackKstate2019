import * as socketIo from 'socket.io';

const sockets = (io: socketIo.Server) =>{
    console.log("sockets started");
    io.on('connection', function (socket) {
        console.log("a player has connected");

        socket.on('playerJoin', function (message) {
            console.log("A player has joined");
        })


        socket.on('pairScreen', function(){
            console.log('Screen has been paired!');
        })
    });
}

export {sockets}