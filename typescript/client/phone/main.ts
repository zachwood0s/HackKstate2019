import {Events} from '../../shared/events';
import { Planet } from '../../shared/Planet';
import * as MenuClicks from './menuOnclicks';

let socket = io();

socket.on("connect", ()=>{
    console.log("Connected to server!");

    socket.emit(Events.PLAYER_JOINED);
})

socket.on(Events.SERVER_TICK, (planets: Planet[])=>{

});

socket.on(Events.OWNED_PLANET, (planet: Planet) => {

});

window.onload = () =>{
    MenuClicks.setupClicks();
}

