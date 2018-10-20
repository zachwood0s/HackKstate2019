import { Canvas } from "./Canvas";
import { Vector } from "../../shared/Vector";
import { PlanetDraw } from "./PlanetDraw";
import {Planet} from "../../shared/Planet";
import { SpriteData } from "./RenderSprite";

const PLANET_SIZE : number = .1;
const SPRITE_DATA : Array<SpriteData> = 
    [new SpriteData("./Content/planetTest.png", new Vector(0,0), new Vector(50, 50), 1000, 40)]

let canvas : Canvas;
let planetCount : number;
let planets : Array<Planet>;
let drawPlanets : Array<PlanetDraw>;

window.onload = () => {
    canvas = new Canvas();

    // Temp
    planetCount = 1;
    let firstPlanet = new Planet("test", 100, 100)
    planets.push(firstPlanet);

    // Create Planet Draw Objects
    planets.forEach(planet => {
        let drawPlanet = AddPlanet(firstPlanet);
        if(drawPlanet != null){
             SetPlanet(drawPlanet, firstPlanet, SPRITE_DATA[0]);
            drawPlanets.push(drawPlanet);
        }
    });

    let render = () => {
        canvas.Clear();

        drawPlanets.forEach(dplanet => {
            dplanet.Render()
        });

        window.requestAnimationFrame(render);
    }
    render();
}

// Temp
function GeneratePlanets(amount: number, screenWidth : number, screenHeight : number, rand : number){
    let planets : Array<Planet> = []
    let ratio : number = screenWidth / screenHeight;
    for (let i = 0; i < amount; i++) {
        let p = new Planet("Planet " + (i+1), 100, 100)
    }
    let xI = screenWidth / amount;
    for(let x = 0; x < screenWidth; x += xI) {
        for (let y = 0; y < screenHeight; y += screenWidth / ratio) {

        }
    }
}

function AddPlanet(planet : Planet) : PlanetDraw | null {
    if(canvas.Ctx == null) return null;
    return new PlanetDraw(canvas.Ctx, planet.position, (canvas.Width / planetCount) * PLANET_SIZE)
}

function SetPlanet(drawPlanet: PlanetDraw, planet : Planet, sprite : SpriteData) : void  {
    drawPlanet.CreateSpriteAnimation(sprite.Src, sprite.WindowPosition, sprite.WindowSize, sprite.Tics, sprite.Speed);

    drawPlanet.RemoveHovers();
    planet.hovered.forEach(player => {
        drawPlanet.AddHover(player.ID + 1);
    });

    if (planet.owner != null) drawPlanet.SetOwner(planet.owner.ID);
}


