import { Canvas } from "./Canvas";
import { Vector } from "../../shared/Vector";
import { PlanetDraw } from "./PlanetDraw";
import {Planet} from "../../shared/Planet";
import { Player } from "../../shared/Player";
import { Link } from "../../shared/Link";
import { ResourceType } from "../../shared/globals";
import { link } from "fs";

let canvas : Canvas;
let planetCount : number;
let planets : Array<Planet> = [];
let drawPlanets : Array<PlanetDraw> = [];

window.onload = () => {
    canvas = new Canvas();

    // Temp
    planets = GeneratePlanets(32, canvas.Width, canvas.Height, 37)
    planets[2].hovered = [new Player(2), new Player(1)]
    planets[5].owner = new Player(2)
    planets[1].owner = new Player(1)
    let link = new Link(planets[1], planets[5], 3, ResourceType.Labor, 1);
    planets[1].outputs = [link]
    
    InitializeData(planets)

    let render = () => {
        canvas.Clear();

        ReceiveData(planets);
        //RemoveLink(link);
        drawPlanets.forEach(dplanet => {
            dplanet.Render()
        });

        window.requestAnimationFrame(render);
    }
    render();
}

function ReceiveData(planets : Array<Planet>) {
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
                        console.log("remove")
                        break;
                    }
                }               
            }
        }
    });
}

// Temp
let rotSpeed = 8;
let size = 50;
let resMin = 50;
let resMax = 100;
function GeneratePlanets(amount: number, screenWidth : number, screenHeight : number, rand : number) : Array<Planet> {
    let resVal = Math.floor(Math.random() * resMax) + resMin;
    let labVal = Math.floor(Math.random() * resMax) + resMin;
    let planets : Array<Planet> = []
    for (let i = 0; i < amount; i++) {
        let p = new Planet("Planet " + (i+1), labVal, resVal)
        planets.push(p)
    }

    // Set Animation
    for (let i = 0; i < planets.length; i++){
        planets[i].spriteData.Src = "./Content/PlanetSprites/01.png"
        planets[i].spriteData.WindowPosition = new Vector(0,0);
        planets[i].spriteData.WindowSize = new Vector(50, 50);
        planets[i].spriteData.Tics = 200;
        planets[i].spriteData.Speed = ((Math.random()/3) + 1) * rotSpeed;
    }

    // Setting position
    let ratio : number = screenWidth / screenHeight;
    let xI = screenWidth / Math.sqrt((amount + 1) * ratio);
    let yI = xI;
    let pc = 0;
    for(let x = rand*2; x < screenWidth - rand*2; x += xI) {
        for (let y = rand*2; y < screenHeight - rand*2; y += yI) {
            if (pc >= planets.length) return planets
            let rx = Math.random() * rand;
            if(Math.random() > .5) rx *= -1;
            let ry = Math.random() * rand * 2;
            if(Math.random() > .5) ry *= -1;
            planets[pc].size = ((Math.random()/3) + 1) * size;
            if((x + rx) > (screenWidth - planets[pc].size - 10) || (x + rx) < 10 || 
                (y + ry) > (screenHeight - planets[pc].size -10) || (y + ry) < 10){
                planets[pc].position = new Vector(x, y);
                pc++
                continue;
            }  
            planets[pc].position = new Vector(x + rx, y + ry);
            pc++;
        }
    }
    return planets;
}

function AddPlanet(planet : Planet) : PlanetDraw | null {
    if(canvas.Ctx == null) return null;
    let drawPlanet = new PlanetDraw(canvas.Ctx, planet.position, planet.size, planet.name)
    drawPlanet.CreateSpriteAnimation(planet.spriteData.Src, planet.spriteData.WindowPosition, planet.spriteData.WindowSize,
        planet.spriteData.Tics, planet.spriteData.Speed);
    return drawPlanet;
}

function SetPlanet(drawPlanet: PlanetDraw, planet : Planet) : void  {
    drawPlanet.RemoveHovers();
    planet.hovered.forEach(player => {
        drawPlanet.AddHover(player.ID + 1);
    });

    if (planet.owner != null) drawPlanet.SetOwner(planet.owner.ID + 1);

    planet.outputs.forEach(out => {
        drawPlanet.AddTransfer(out.to.position, out.type, out.rate, out.id)
    });
}