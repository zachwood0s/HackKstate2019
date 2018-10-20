"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Canvas = /** @class */ (function () {
    function Canvas() {
        this.Height = window.innerHeight;
        this.Width = window.innerWidth;
        this.canvas = document.getElementById('screen');
        this.canvas.width = this.Width;
        this.canvas.height = this.Height;
        this.Ctx = this.canvas.getContext("2d");
    }
    Canvas.prototype.Clear = function () {
        if (this.Ctx == null)
            return;
        this.Ctx.clearRect(0, 0, this.Width, this.Height);
    };
    return Canvas;
}());
exports.Canvas = Canvas;
