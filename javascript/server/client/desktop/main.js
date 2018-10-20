"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Canvas_1 = require("./Canvas");
console.log("test");
window.onload = function () {
    var canvas = new Canvas_1.Canvas();
    if (canvas.Ctx == null)
        return;
    //let testAnimation = new Animation(canvas.Ctx, "./spriteSheets/test.png", 0, 0, 55, 55, 9)
    var render = function () {
        canvas.Clear();
        window.requestAnimationFrame(render);
    };
    render();
};
