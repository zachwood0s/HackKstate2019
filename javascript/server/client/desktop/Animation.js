"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation = /** @class */ (function () {
    function Animation(ctx, spriteSheet, windowX, windowY, windowWidth, windowHeight, windowTicks, speed) {
        if (speed === void 0) { speed = 1; }
        this._spriteSheet = new Image();
        this._spriteSheet.src = spriteSheet;
        this._ctx = ctx;
        this._windowX = windowX;
        this._windowY = windowY;
        this._windowWidth = windowWidth;
        this._windowHeight = windowHeight;
        this._windowTicks = windowTicks;
        this._speed = speed;
        this._frame = 0;
        this._startTime = 0;
    }
    //public SetPosition
    Animation.prototype.Draw = function (x, y, width, height) {
        if (((Date.now() - this._startTime) / 1000) > (this._speed / this._windowTicks)) {
            this._frame++;
            this._startTime = Date.now();
            if (this._frame >= this._windowTicks)
                this._frame = 0;
        }
        this._ctx.drawImage(this._spriteSheet, this._windowX + (this._frame * this._windowWidth), this._windowY, this._windowWidth, this._windowHeight, x, y, width, height);
    };
    return Animation;
}());
exports.Animation = Animation;
