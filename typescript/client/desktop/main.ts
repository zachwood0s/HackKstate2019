import { Canvas } from "./Canvas";
import { Vector } from "../../shared/Vector";
import { PlanetDraw } from "./PlanetDraw";
import {Planet} from "../../shared/Planet";
import { Player } from "../../shared/Player";
import { Link } from "../../shared/Link";
import { ResourceType } from "../../shared/globals";
import { link } from "fs";
import { Events } from "../../shared/events";
import { GeneratePlanets } from "../../server/GeneratePlanets";
import {parse} from 'flatted';

let canvas : Canvas;
let planetCount : number;
let planets : Array<Planet> = [];
let drawPlanets : Array<PlanetDraw> = [];

// Save for real
let socket = io()
socket.on("connect", ()=>{
    console.log("Connected to server!");

    socket.emit(Events.SCREEN_PAIRED);
})

socket.on(Events.SERVER_TICK, (planets: string)=>{
    ReceiveData(parse(planets));
});

window.onload = () => {
    canvas = new Canvas();
    let background = new Image();
    background.src = "/views/Content/Backgrounds/0.png"

    // Temp
    /*planets = GeneratePlanets(32, canvas.Width, canvas.Height)
    planets[2].hovered = [new Player(2), new Player(1)]
    planets[5].owner = new Player(2)
    planets[1].owner = new Player(1)
    let link = new Link(planets[1], planets[5], 3, ResourceType.Labor, 1);
    planets[1].outputs = [link]*/

    let render = () => {
        canvas.Clear();

        // Temp
        ReceiveData(planets);
        //RemoveLink(link);

        if(canvas.Ctx == null) return;
        canvas.Ctx.restore()
        canvas.Ctx.drawImage(background, 0, 0, canvas.Width, canvas.Width * (background.height / background.width))

        drawPlanets.forEach(dplanet => {
            dplanet.Render()
        });

        window.requestAnimationFrame(render);
    }
    render();
}

function ReceiveData(planets : Array<Planet>) {
    if (drawPlanets.length == 0)
        InitializeData(planets)
    for (let i = 0; i < planets.length; i++) {
        SetPlanet(drawPlanets[i], planets[i])
    }
}

function InitializeData(planets : Array<Planet>) {
    planetCount = planets.length;
    for (let planet of planets) {
        let drawPlanet = AddPlanet(planet);
        if(drawPlanet != null){
            SetPlanet(drawPlanet, planet)
            drawPlanets.push(drawPlanet);
        }
    }
}

function RemoveLink(link : Link) {
    planets.forEach(planet => {
        for (let i = 0; i < planet.outputs.length; i++){
            if(planet.outputs[i].id == link.id) {
                for(let j = 0; j < drawPlanets.length; j++) {
                    if(drawPlanets[j].name == planet.name) {
                        drawPlanets[j].RemoveTransfer(link.id);
                        break;
                    }
                }               
            }
        }
    });
}

function AddPlanet(planet : Planet) : PlanetDraw | null {
    if(canvas.Ctx == null) return null;
    let drawPlanet = new PlanetDraw(canvas.Ctx, planet.position, planet.size, planet.name)
    drawPlanet.CreateSpriteAnimation(planet.spriteData.Src, planet.spriteData.WindowPosition, planet.spriteData.WindowSize,
        planet.spriteData.Tics, planet.spriteData.Speed, planet.spriteData.Rotation);
    return drawPlanet;
}

function SetPlanet(drawPlanet: PlanetDraw, planet : Planet) : void  {
    drawPlanet.RemoveHovers();
    planet.hovered.forEach(player => {
        drawPlanet.AddHover(player.id + 1);
    });

    if (planet.owner != null) drawPlanet.SetOwner(planet.owner.id + 1);

    planet.outputs.forEach(out => {
        if (planet.owner != null)
            drawPlanet.AddTransfer(out.to.position, out.type, out.rate, out.id, planet.owner.id + 1)
    });
}