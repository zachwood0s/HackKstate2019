import { Canvas } from "./Canvas";
import { Vector } from "../../shared/Vector";
import { PlanetDraw } from "./PlanetDraw";
import {Planet} from "../../shared/Planet";
import { Player } from "../../shared/Player";
import { Link } from "../../shared/Link";
import { ResourceType } from "../../shared/globals";

const PLANET_SIZE : number = .5;

let canvas : Canvas;
let planetCount : number;
let planets : Array<Planet> = [];
let drawPlanets : Array<PlanetDraw> = [];

window.onload = () => {
    canvas = new Canvas();

    // Temp
    planets = GeneratePlanets(32, canvas.Width, canvas.Height, 45)
    planets[2].hovered = [new Player(2), new Player(1)]
    planets[5].owner = new Player(2)
    planets[1].owner = new Player(1)
    planets[1].outputs = [new Link(planets[1], planets[5], 30, ResourceType.Labor, 1)]
    for(let i = 0; i < planets.length; i++) {
        planets[i].spriteData.Src = "./Content/planetTest.png"
        planets[i].spriteData.WindowPosition = new Vector(0,0);
        planets[i].spriteData.WindowSize = new Vector(50, 50);
        planets[i].spriteData.Tics = 200;
        planets[i].spriteData.Speed = 10;
    }

    InitializeData(planets)

    let render = () => {
        canvas.Clear();

        ReceiveData(planets);
        console.log(drawPlanets.length)
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

// Temp
function GeneratePlanets(amount: number, screenWidth : number, screenHeight : number, rand : number) : Array<Planet> {
    let planets : Array<Planet> = []
    for (let i = 0; i < amount; i++) {
        let p = new Planet("Planet " + (i+1), 100, 100)
        planets.push(p)
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
            if((x + rx) > (screenWidth - planets[pc].size / 2) || (x + rx) < (planets[pc].size / 2) || 
                (y + ry) > (screenHeight - planets[pc].size / 2) || (y + ry) < (planets[pc].size / 2)){
                planets[pc].position = new Vector(x, y);
                pc++
                continue;
            }
            planets[pc].size = ((Math.random()/10) + 1) * 50;
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

    drawPlanet.RemoveTransfers();
    planet.outputs.forEach(out => {
        drawPlanet.AddTransfer(out.to.position, out.type)
    });
}


