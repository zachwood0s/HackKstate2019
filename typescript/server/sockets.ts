import * as socketIo from 'socket.io';
import {Events} from '../shared/events';
import { Game } from './Game';
import { Player } from '../shared/Player';
import { Link } from '../shared/Link';
import { Focus, Planet, SpriteData } from '../shared/Planet';
import {stringify, parse} from 'flatted';
import { ResourceType } from '../shared/globals';

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

            let newPlayer = game.createPlayer();
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

        socket.on(Events.LINK_CREATED, function(linkText: string){
            let link = parse(linkText) as Link;
            console.log("A link has been created", link.from.name, "->", link.to.name, link.id, ResourceType[link.type]);

            let newLink = game.createLink(link);
            if(newLink){
                console.log("link succeeded", newLink.id);
                //console.log(newLink);
                //newLink.from.spriteData = new SpriteData();
                //newLink.to.spriteData = new SpriteData();
                //let stringed = JSON.stringify(newLink);
                socket.emit(Events.LINK_ID, stringify(newLink));
            }
            else{
                console.log("link failed");
            }
        })
        //-----
        socket.on(Events.LINK_DELETED, function(linkText: string){
            let link = parse(linkText) as Link;
            console.log('A link has been deleted', link.from.name, '->', link.to.name, link.id, link.type);
            game.deleteLink(link);
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