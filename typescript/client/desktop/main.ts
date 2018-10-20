import { Canvas } from "./Canvas";
import { Vector } from "../../shared/Vector";
import { PlanetDraw } from "./PlanetDraw";
import {Planet} from "../../shared/Planet";

window.onload = () => {
    let canvas = new Canvas();
    if(canvas.Ctx == null) return;

    let firstPlanet = new Planet("test", 100, 100)
    //SetPlanet(firstPlanet);

    let testPlanet = new PlanetDraw(canvas.Ctx, new Vector(100, 100), 100);
    testPlanet.CreateSpriteAnimation("./Content/planetTest.png", new Vector(0,0), new Vector(100, 100), 50, 10);
    testPlanet.AddHover(1);

    let render = () => {
        canvas.Clear();

        testPlanet.Render();

        window.requestAnimationFrame(render);
    }
    render();
}


/*function SetPlanet(planet : Planet, ctx : CanvasRenderingContext2D) : PlanetDraw  {
    let drawPlanet = new PlanetDraw(ctx, )
}*/


