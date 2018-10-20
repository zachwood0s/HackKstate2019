import {Events} from '../../shared/events';
import { Planet } from '../../shared/Planet';
import * as MenuClicks from './menuOnclicks';
import {UIUpdater} from './UiUpdater';

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
    let updater = new UIUpdater();

    updater.SetupOnClicks();

    let testPlanet = new Planet("Earth", 70, 40);
    updater.UpdatePlanets([testPlanet, new Planet("Mars", 60, 20), new Planet("Your Anus", 100, 100)]);

    let clickClearfix = document.getElementById("clickClearfix");
    if(clickClearfix){
        clickClearfix.onclick = () => {
            updater.CloseSelectedPlanetsList();
        }
    }
}


function setupTestPlanets(){

}

