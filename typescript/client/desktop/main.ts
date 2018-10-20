import { Canvas } from "./Canvas";
import { Vector } from "../../shared/Vector";
import { PlanetDraw } from "./PlanetDraw";
import {Planet} from "../../shared/Planet";
import { SpriteData } from "./RenderSprite";
import { Player } from "../../shared/Player";

const PLANET_SIZE : number = .5;
const SPRITE_DATA : Array<SpriteData> = 
    [new SpriteData("./Content/planetTest.png", new Vector(0,0), new Vector(100, 100), 250, 40)]

let canvas : Canvas;
let planetCount : number;
let planets : Array<Planet> = [];
let drawPlanets : Array<PlanetDraw> = [];

window.onload = () => {
    canvas = new Canvas();

    planets = GeneratePlanets(10, canvas.Width, canvas.Height, 30)
    planets[2].hovered = [new Player(2), new Player(1)]
    planets[5].owner = new Player(2)

    // Create Planet Draw Objects
    planetCount = planets.length;
    for (let planet of planets) {
        let drawPlanet = AddPlanet(planet);
        if(drawPlanet != null){
            drawPlanets.push(drawPlanet);
        }
    }

    let render = () => {
        canvas.Clear();
        
        drawPlanets.forEach(dplanet => {
            dplanet.SetPlanet(SPRITE_DATA[0])
            dplanet.Render()
        });

        window.requestAnimationFrame(render);
    }
    render();
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
    return new PlanetDraw(canvas.Ctx, planet.position, (canvas.Width / planetCount) * PLANET_SIZE, planet)
}

/*function SetPlanet(drawPlanet: PlanetDraw, planet : Planet, sprite : SpriteData) : void  {
    drawPlanet.CreateSpriteAnimation(sprite.Src, sprite.WindowPosition, sprite.WindowSize, sprite.Tics, sprite.Speed);

    drawPlanet.RemoveHovers();
    planet.hovered.forEach(player => {
        drawPlanet.AddHover(player.ID + 1);
    });

    if (planet.owner != null) drawPlanet.SetOwner(planet.owner.ID + 1);

    drawPlanet.RemoveTransfers();
    planet.outputs.forEach(out => {
        drawPlanet.AddTransfer(out.to.position, out.type)
    });
}*/


