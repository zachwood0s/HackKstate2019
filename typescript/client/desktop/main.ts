import { Canvas } from "./Canvas";
import { RenderSprite } from "./RenderSprite";
import { Vector } from "../../shared/Vector";
import { MoveObject } from "./Animations"

window.onload = () =>{
    let canvas = new Canvas();
    if(canvas.Ctx == null) return;

    let planetRender = new RenderSprite(canvas.Ctx, new Vector(100, 100), new Vector(100, 100), "./Content/planetTest.png")
    let staticPlanet = new RenderSprite(canvas.Ctx, new Vector(300, 300), new Vector(100, 100), "./Content/singlePlanetTest.png")
    planetRender.SetAnimationFrame(new Vector(0,0), new Vector(100, 100), 50, 10)

    let render = () => {
        canvas.Clear();

        MoveObject(staticPlanet.Position, new Vector(1000, 500))
        
        staticPlanet.Draw()
        planetRender.Draw()

        window.requestAnimationFrame(render);
    }
    render();
}