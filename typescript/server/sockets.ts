import * as socketIo from 'socket.io';
import {Events} from '../shared/events';
import { Game } from './Game';
import { Player } from '../shared/Player';
import { Link } from '../shared/Link';
import { Focus, Planet } from '../shared/Planet';

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

        socket.on(Events.FOCUS_SET, function(focus: Focus, planet: Planet){
            console.log("Set focus for planet:", planet.name, Focus[focus]);
            game.setFocus(planet, focus);
        });

        socket.on(Events.LINK_CREATED, function(link: Link){
            console.log("A link has been created", link.from, link.to, link.id, link.type);

        })
        //-----
        socket.on(Events.LINK_DELETED, function(){
            console.log('Screen has been paired!');
            game.PairScreen(socket);
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