import * as socketIo from 'socket.io';
import {Events} from '../shared/events';

const sockets = (io: socketIo.Server) =>{
    console.log("sockets started");
    io.on('connection', function (socket) {
        console.log("a player has connected");

        socket.on('playerJoin', function (message) {
            console.log("A player has joined");
        })


        socket.on(Events.SCREEN_PAIRED, function(){
            console.log('Screen has been paired!');
        })

        socket.on(Events.PLAYER_JOINED, function(){
            console.log('A player has joined!');

            //socket.emit(Events.PLAYER_ID, )
        })

        socket.on(Events.LINK_CREATED, function(){
            console.log("A link has been created");
        })

    });
}

export {sockets}