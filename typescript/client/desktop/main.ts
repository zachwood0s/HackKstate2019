import { Canvas } from "./Canvas";
import { Render } from "./Render";
import { Vector } from "../../shared/Vector";

console.log("test")
window.onload = () =>{
    let canvas = new Canvas();
    if(canvas.Ctx == null) return;

    let planetRender = new Render(canvas.Ctx, "./Content/test.png", new Vector(100, 100), new Vector(100, 100))
    let staticPlanet = new Render(canvas.Ctx, "./Content/singlePlanet.png", new Vector(300, 300), new Vector(100, 100))
    planetRender.SetAnimationFrame(new Vector(0,0), new Vector(100, 100), 20)

    let render = () => {
        canvas.Clear();
        
        staticPlanet.Draw()
        planetRender.Draw()

        window.requestAnimationFrame(render);
    }
    render();
}