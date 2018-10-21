import {Events} from '../../shared/events';
import { Planet } from '../../shared/Planet';
import * as MenuClicks from './menuOnclicks';
import {UIUpdater} from './UiUpdater';
import { Player } from '../../shared/Player';

let socket = io();

socket.on("connect", ()=>{
    console.log("Connected to server!");
})


window.onload = () =>{
    socket.emit(Events.PLAYER_JOINED);

    socket.on(Events.PLAYER_ID, (player: Player) => {
        console.log("Player ID recieved!", player);
        setupGame(player);
    });

    document.onclick = function (argument) {
       launchIntoFullscreen(document.documentElement);
    }
} 
function launchIntoFullscreen(element: any) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
}

function setupGame(player: Player){
    let updater = new UIUpdater(socket, player);

    let clickClearfix = document.getElementById("clickClearfix");
    if(clickClearfix){
        clickClearfix.onclick = () => {
            updater.CloseSelectedPlanetsList();
        }
    }

    socket.on(Events.SERVER_TICK, function(planets: Planet[]){
        updater.UpdatePlanets(planets);
    });
}


