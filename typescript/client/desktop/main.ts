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
    planets = GeneratePlanets(10, canvas.Width, canvas.Height, 30)
    planets[2].hovered = [new Player(2), new Player(1)]
    planets[5].owner = new Player(2)
    //planets[1].outputs = [new Link(planets[1], planets[5], 30, ResourceType.Labor)]
    for(let i = 0; i < planets.length; i++) {
        planets[i].spriteData.Src = "./Content/planetTest.png"
        planets[i].spriteData.WindowPosition = new Vector(0,0);
        planets[i].spriteData.WindowSize = new Vector(100, 100);
        planets[i].spriteData.Tics = 250;
        planets[i].spriteData.Speed = 30;
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
    let ratio : number = screenWidth / screenHeight;
    for (let i = 0; i < amount; i++) {
        let p = new Planet("Planet " + (i+1), 100, 100)
        planets.push(p)
    }

    // Setting position
    let xI = screenWidth / Math.sqrt((amount) * ratio);
    let yI = screenHeight / Math.sqrt((amount) * ratio);
    let pc = 0;
    for(let x = xI; x < screenWidth; x += xI) {
        for (let y = yI; y < screenHeight; y += yI) {
            if (pc >= planets.length) return planets
            let rx = Math.random() * rand;
            if(Math.random() > .5) rx *= -1;
            let ry = Math.random() * rand;
            if(Math.random() > .5) ry *= -1;
            planets[pc].position = new Vector(x + rx, y + ry);
            pc++
        }
    }
    return planets;
}

function AddPlanet(planet : Planet) : PlanetDraw | null {
    if(canvas.Ctx == null) return null;
    let drawPlanet = new PlanetDraw(canvas.Ctx, planet.position, (canvas.Width / planetCount) * PLANET_SIZE, planet.name)
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


