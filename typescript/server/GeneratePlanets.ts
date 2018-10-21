import { Planet } from "../shared/Planet";
import { Vector } from "../shared/Vector";
import { PlanetServ } from "./PlanetServ";
import { Buffer } from "../shared/Planet"
import { Game } from "./Game";


const planetNames = [
    "Thacaicury",
    "Inoyama",
    "Suchion",
    "Bugonoe",
    "Getera",
    "Kieturn",
    "Seboria",
    "Chibunope",
    "Norix NU",
    "Driri 4NC",
    "Acouter",
    "Dandialia",
    "Panziuq",
    "Ulladus",
    "Kovis",
    "Nutera",
    "Tradibos",
    "Doteruta",
    "Pharvis 0P",
    "Buna 9D8",
    "Gochicury",
    "Dolliulia",
    "Ebov",
    "Chavarvis",
    "Niostea",
    "Huatis",
    "Llocheturn",
    "Troitania",
    "Trosie 758",
    "Croth 4R7",
    "Zeno F84",
    "X-Crhon"
]

let rotSpeed = 8;
let size = 50;
let rand = 37;
function GeneratePlanets(amount: number, screenWidth : number, screenHeight : number) : Array<PlanetServ> {
    let planets : Array<PlanetServ> = []
    for (let i = 0; i < amount; i++) {
        let resMax = Buffer.BUFFER_MAX;
        let resMin = resMax - (resMax / 2)
        let resVal = Math.floor(Math.random() * (resMax - resMin)) + resMin;
        let labVal = Math.floor(Math.random() * (resMax - resMin)) + resMin;
        let p = new PlanetServ(planetNames[i], labVal, resVal)
        planets.push(p)
    }

    // Set Animation
    for (let i = 0; i < planets.length; i++){
        planets[i].spriteData.Src = "./Content/PlanetSprites/00.png"
        planets[i].spriteData.WindowPosition = new Vector(0,0);
        planets[i].spriteData.WindowSize = new Vector(75, 75);
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
            let rad = Math.random() * Math.PI/3 - Math.PI/6
            planets[pc].size = ((Math.random()/3) + 1) * size;
            planets[pc].spriteData.Rotation = rad;
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