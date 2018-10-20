import { Canvas } from "./Canvas";
import { Animation } from "./Animation";

console.log("test")
window.onload = () =>{
    let canvas = new Canvas();
    if(canvas.Ctx == null) return;
    //let testAnimation = new Animation(canvas.Ctx, "./spriteSheets/test.png", 0, 0, 55, 55, 9)

    let render = () => {
        canvas.Clear();
        
        
        window.requestAnimationFrame(render);
    }
    render();
}