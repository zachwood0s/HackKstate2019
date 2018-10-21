import { Planet } from "../shared/Planet";
import { Vector } from "../shared/Vector";
import { PlanetServ } from "./PlanetServ";

let rotSpeed = 8;
let size = 50;
let resMin = 50;
let resMax = 100;
let rand = 37;
function GeneratePlanets(amount: number, screenWidth : number, screenHeight : number) : Array<PlanetServ> {
    let resVal = Math.floor(Math.random() * resMax) + resMin;
    let labVal = Math.floor(Math.random() * resMax) + resMin;
    let planets : Array<PlanetServ> = []
    for (let i = 0; i < amount; i++) {
        let p = new PlanetServ("Planet " + (i+1), labVal, resVal)
        planets.push(p)
    }

    // Set Animation
    for (let i = 0; i < planets.length; i++){
        planets[i].spriteData.Src = "/views/Content/PlanetSprites/01.png"
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

export {GeneratePlanets}