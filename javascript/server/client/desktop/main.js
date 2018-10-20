"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Canvas_1 = require("./Canvas");
var Render_1 = require("./Render");
var Vector_1 = require("../../shared/Vector");
window.onload = function () {
    var canvas = new Canvas_1.Canvas();
    if (canvas.Ctx == null)
        return;
    var planetRender = new Render_1.Render(canvas.Ctx, "./Content/planetTest.png", new Vector_1.Vector(100, 100), new Vector_1.Vector(100, 100));
    var staticPlanet = new Render_1.Render(canvas.Ctx, "./Content/singlePlanetTest.png", new Vector_1.Vector(300, 300), new Vector_1.Vector(100, 100));
    planetRender.SetAnimationFrame(new Vector_1.Vector(0, 0), new Vector_1.Vector(200, 200), 50, 42);
    staticPlanet.MoveObject(new Vector_1.Vector(200, 200));
    var render = function () {
        canvas.Clear();
        staticPlanet.MoveObject(new Vector_1.Vector(1000, 500), .1);
        staticPlanet.Draw();
        planetRender.Draw();
        window.requestAnimationFrame(render);
    };
    render();
};
