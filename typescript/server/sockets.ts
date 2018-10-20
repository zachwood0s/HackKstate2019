import * as socketIo from 'socket.io';
import {Events} from '../shared/events';
import { Game } from './Game';
import { Player } from '../shared/Player';

const sockets = (io: socketIo.Server, game: Game) =>{
    console.log("sockets started");
    io.on('connection', function (socket) {
        console.log("a player has connected");

        let player: Player | null;

        
        socket.on(Events.SCREEN_PAIRED, function(){
            console.log('Screen has been paired!');
            game.PairScreen(socket);
        })

        socket.on(Events.PLAYER_JOINED, function(){
            console.log('A player has joined!');

            let newPlayer = game.AddPlayer();
            player = newPlayer;
            socket.emit(Events.PLAYER_ID, newPlayer);
            //socket.emit(Events.PLAYER_ID, )
        })

        socket.on(Events.SELECTED_PLANET, function(name: string){
            console.log("Recieved selected planet:", name);
            console.log(player);
            if(player){
                game.SelectPlanet(name, player);
            }
        })

        socket.on(Events.LINK_CREATED, function(){
            console.log("A link has been created");
        })

        socket.on('disconnect', function(){
            console.log('user disconnected');
            if(player){
                game.RemovePlayer(player);
            }
        });
    });
}

export {sockets}