import {Events} from '../../shared/events';
import { Planet } from '../../shared/Planet';
import * as MenuClicks from './menuOnclicks';
import {UIUpdater} from './UiUpdater';
import { Player } from '../../shared/Player';

let socket = io();

socket.on("connect", ()=>{
    console.log("Connected to server!");
})

socket.on(Events.SERVER_TICK, (planets: Planet[])=>{

});


window.onload = () =>{
    socket.emit(Events.PLAYER_JOINED);

    socket.on(Events.PLAYER_ID, (player: Player) => {
        console.log("Player ID recieved!", player);
        setupGame(player);
    });
}

function setupGame(player: Player){
    let updater = new UIUpdater(socket, player);

    let testPlanet = new Planet("Earth", 70, 40);
    updater.UpdatePlanets([testPlanet, new Planet("Mars", 60, 20), new Planet("Your Anus", 100, 100)]);

    let clickClearfix = document.getElementById("clickClearfix");
    if(clickClearfix){
        clickClearfix.onclick = () => {
            updater.CloseSelectedPlanetsList();
        }
    }

    socket.on(Events.SERVER_TICK, function(planets: Planet[]){
        updater.UpdatePlanets(planets);
        console.log("recieved server tick", planets);
    });
}


