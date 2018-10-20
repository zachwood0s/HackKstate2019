(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Canvas = /** @class */ (function () {
    function Canvas() {
        this.Height = window.innerHeight;
        this.Width = window.innerWidth;
        this.canvas = document.getElementById('mainScreen');
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

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector_1 = require("../../shared/Vector");
var Render = /** @class */ (function () {
    function Render(ctx, position, size, spriteSheet, text, fontSize) {
        if (spriteSheet === void 0) { spriteSheet = ""; }
        if (text === void 0) { text = ""; }
        if (fontSize === void 0) { fontSize = 12; }
        this._velocity = new Vector_1.Vector(0, 0);
        // Animation
        this._spriteSheet = new Image();
        this._windowPosition = new Vector_1.Vector(0, 0);
        this._windowSize = new Vector_1.Vector(0, 0);
        this._windowTicks = 1;
        this._speed = 1;
        this._frame = 0;
        this._isSprite = true;
        this._endPosition = new Vector_1.Vector(0, 0);
        this._startTime = 0;
        if (spriteSheet != "") {
            this._spriteSheet = new Image();
            this._spriteSheet.src = spriteSheet;
            this._windowSize = new Vector_1.Vector(this._spriteSheet.width, this._spriteSheet.height);
        }
        else {
            this._isSprite = false;
        }
        this._ctx = ctx;
        this._position = position;
        this._size = size;
        this._text = text;
        this._fontSize = fontSize;
    }
    Render.prototype.SetText = function (text, fontSize) {
        this._text = text;
        this._fontSize = fontSize;
    };
    Render.prototype.SetRenderLocation = function (position, size) {
        if (size === void 0) { size = this._size; }
        this._position = position;
        this._size = size;
    };
    Render.prototype.SetAnimationFrame = function (windowPosition, windowSize, windowTicks, speed) {
        if (speed === void 0) { speed = 5; }
        this._windowPosition = windowPosition;
        this._windowSize = windowSize;
        this._windowTicks = windowTicks;
        this._speed = speed;
    };
    Render.prototype.Draw = function () {
        // Render Sprite / Animation
        if (this._isSprite) {
            if (((Date.now() - this._startTime) / 1000) > (this._speed / this._windowTicks)) {
                this._frame++;
                this._startTime = Date.now();
                if (this._frame >= this._windowTicks)
                    this._frame = 0;
            }
            this._ctx.drawImage(this._spriteSheet, this._windowPosition.x + (this._frame * this._windowSize.x), this._windowPosition.y, this._windowSize.x, this._windowSize.y, this._position.x, this._position.y, this._size.x, this._size.y);
        }
        // Render text
        if (this._text != "") {
            this._ctx.fillText(this._text, this._position.x, this._position.y, this._fontSize);
        }
        // Move animation
        if (Math.abs(this._position.x - this._endPosition.x) > this._velocity.x &&
            Math.abs(this._position.y - this._endPosition.y) > this._velocity.y) {
            this._position.x += this._velocity.x;
            this._position.y += this._velocity.y;
        }
    };
    Render.prototype.MoveObject = function (endPosition, speed) {
        if (speed === void 0) { speed = 1; }
        var difX = endPosition.x - this._position.x;
        var difY = endPosition.y - this._position.y;
        var mag = Math.sqrt(difX * difX + difY * difY);
        this._velocity = new Vector_1.Vector((difX / mag) * speed, (difY / mag) * speed);
        this._endPosition = endPosition;
    };
    return Render;
}());
exports.Render = Render;

},{"../../shared/Vector":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Canvas_1 = require("./Canvas");
var Render_1 = require("./Render");
var Vector_1 = require("../../shared/Vector");
window.onload = function () {
    var canvas = new Canvas_1.Canvas();
    if (canvas.Ctx == null)
        return;
    var planetRender = new Render_1.Render(canvas.Ctx, new Vector_1.Vector(100, 100), new Vector_1.Vector(100, 100), "./Content/planetTest.png");
    var staticPlanet = new Render_1.Render(canvas.Ctx, new Vector_1.Vector(300, 300), new Vector_1.Vector(100, 100), "./Content/singlePlanetTest.png");
    planetRender.SetAnimationFrame(new Vector_1.Vector(0, 0), new Vector_1.Vector(100, 100), 50, 10);
    staticPlanet.MoveObject(new Vector_1.Vector(200, 200));
    var render = function () {
        canvas.Clear();
        staticPlanet.MoveObject(new Vector_1.Vector(1000, 500), 1);
        staticPlanet.Draw();
        planetRender.Draw();
        window.requestAnimationFrame(render);
    };
    render();
};

},{"../../shared/Vector":4,"./Canvas":1,"./Render":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    return Vector;
}());
exports.Vector = Vector;

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0eXBlc2NyaXB0L2NsaWVudC9kZXNrdG9wL0NhbnZhcy50cyIsInR5cGVzY3JpcHQvY2xpZW50L2Rlc2t0b3AvUmVuZGVyLnRzIiwidHlwZXNjcmlwdC9jbGllbnQvZGVza3RvcC9tYWluLnRzIiwidHlwZXNjcmlwdC9zaGFyZWQvVmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtJQU9JO1FBTE8sV0FBTSxHQUFXLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDcEMsVUFBSyxHQUFXLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFLckMsSUFBSSxDQUFDLE1BQU0sR0FBc0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sc0JBQUssR0FBWjtRQUNJLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJO1lBQUUsT0FBTTtRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FsQkEsQUFrQkMsSUFBQTtBQUVRLHdCQUFNOzs7OztBQ3BCZiw4Q0FBNkM7QUFFN0M7SUF1QkksZ0JBQVksR0FBOEIsRUFBRSxRQUFpQixFQUFFLElBQWEsRUFBRSxXQUF5QixFQUMzRixJQUFrQixFQUFFLFFBQXNCO1FBRHdCLDRCQUFBLEVB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LENBQUE7SUFDakgsSUFBSSxZQUFZLEdBQUcsSUFBSSxlQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLGVBQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxlQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLGdDQUFnQyxDQUFDLENBQUE7SUFDdkgsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksZUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxJQUFJLGVBQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzdFLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxlQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFFN0MsSUFBSSxNQUFNLEdBQUc7UUFDVCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFZixZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUVqRCxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDbkIsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFBO1FBRW5CLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUE7SUFDRCxNQUFNLEVBQUUsQ0FBQztBQUNiLENBQUMsQ0FBQTs7Ozs7QUN4QkQ7SUFJSSxnQkFBWSxDQUFVLEVBQUUsQ0FBVTtRQUM5QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNWLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2QsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQUVRLHdCQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY2xhc3MgQ2FudmFzIHtcbiAgICBwdWJsaWMgQ3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsO1xuICAgIHB1YmxpYyBIZWlnaHQ6IG51bWJlciA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBwdWJsaWMgV2lkdGg6IG51bWJlciA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluU2NyZWVuJyk7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5XaWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5IZWlnaHQ7XG4gICAgICAgIHRoaXMuQ3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBDbGVhcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuQ3R4ID09IG51bGwpIHJldHVyblxuICAgICAgICB0aGlzLkN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5XaWR0aCwgdGhpcy5IZWlnaHQpXG4gICAgfVxufVxuXG5leHBvcnQgeyBDYW52YXMgfSIsImltcG9ydCB7IFZlY3RvciB9IGZyb20gXCIuLi8uLi9zaGFyZWQvVmVjdG9yXCI7XG5cbmNsYXNzIFJlbmRlciB7XG4gICAgLy8gUG9zaXRpb25cbiAgICBwcml2YXRlIF9jdHggOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gICAgcHJpdmF0ZSBfcG9zaXRpb24gOiBWZWN0b3I7XG4gICAgcHJpdmF0ZSBfc2l6ZSA6IFZlY3RvcjtcbiAgICBwcml2YXRlIF92ZWxvY2l0eSA6IFZlY3RvciA9IG5ldyBWZWN0b3IoMCwgMCk7XG5cbiAgICAvLyBBbmltYXRpb25cbiAgICBwcml2YXRlIF9zcHJpdGVTaGVldCA6IENhbnZhc0ltYWdlU291cmNlID0gbmV3IEltYWdlKCk7XG4gICAgcHJpdmF0ZSBfd2luZG93UG9zaXRpb24gOiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgIHByaXZhdGUgX3dpbmRvd1NpemUgOiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgIHByaXZhdGUgX3dpbmRvd1RpY2tzIDogbnVtYmVyID0gMTtcbiAgICBwcml2YXRlIF9zcGVlZCA6IG51bWJlciA9IDE7XG4gICAgcHJpdmF0ZSBfZnJhbWUgOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX2lzU3ByaXRlIDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHJpdmF0ZSBfZW5kUG9zaXRpb24gOiBWZWN0b3IgPSBuZXcgVmVjdG9yKDAsIDApO1xuICAgIHByaXZhdGUgX3N0YXJ0VGltZSA6IG51bWJlciA9IDA7XG5cbiAgICAvLyBUZXh0XG4gICAgcHJpdmF0ZSBfdGV4dCA6IHN0cmluZztcbiAgICBwcml2YXRlIF9mb250U2l6ZSA6IG51bWJlcjtcblxuXG4gICAgY29uc3RydWN0b3IoY3R4IDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBwb3NpdGlvbiA6IFZlY3Rvciwgc2l6ZSA6IFZlY3Rvciwgc3ByaXRlU2hlZXQgOiBzdHJpbmcgPSBcIlwiLCBcbiAgICAgICAgICAgICAgICB0ZXh0IDogc3RyaW5nID0gXCJcIiwgZm9udFNpemUgOiBudW1iZXIgPSAxMikge1xuICAgICAgICBpZiAoc3ByaXRlU2hlZXQgIT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2hlZXQgPSBuZXcgSW1hZ2UoKVxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2hlZXQuc3JjID0gc3ByaXRlU2hlZXRcbiAgICAgICAgICAgIHRoaXMuX3dpbmRvd1NpemUgPSBuZXcgVmVjdG9yKHRoaXMuX3Nwcml0ZVNoZWV0LndpZHRoLCB0aGlzLl9zcHJpdGVTaGVldC5oZWlnaHQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9pc1Nwcml0ZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMuX2ZvbnRTaXplICA9IGZvbnRTaXplO1xuICAgIH1cblxuICAgIHB1YmxpYyBTZXRUZXh0KHRleHQgOiBzdHJpbmcsIGZvbnRTaXplIDogbnVtYmVyKXtcbiAgICAgICAgdGhpcy5fdGV4dCA9IHRleHQ7XG4gICAgICAgIHRoaXMuX2ZvbnRTaXplID0gZm9udFNpemU7XG4gICAgfVxuXG4gICAgcHVibGljIFNldFJlbmRlckxvY2F0aW9uKHBvc2l0aW9uIDogVmVjdG9yLCBzaXplIDogVmVjdG9yID0gdGhpcy5fc2l6ZSkge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgU2V0QW5pbWF0aW9uRnJhbWUod2luZG93UG9zaXRpb24gOiBWZWN0b3IsIHdpbmRvd1NpemUgOiBWZWN0b3IsIHdpbmRvd1RpY2tzIDogbnVtYmVyLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQgOiBudW1iZXIgPSA1KSA6IHZvaWQge1xuICAgICAgICB0aGlzLl93aW5kb3dQb3NpdGlvbiA9IHdpbmRvd1Bvc2l0aW9uO1xuICAgICAgICB0aGlzLl93aW5kb3dTaXplID0gd2luZG93U2l6ZTtcbiAgICAgICAgdGhpcy5fd2luZG93VGlja3MgPSB3aW5kb3dUaWNrcztcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgRHJhdygpIDogdm9pZCB7XG4gICAgICAgIC8vIFJlbmRlciBTcHJpdGUgLyBBbmltYXRpb25cbiAgICAgICAgaWYgKHRoaXMuX2lzU3ByaXRlKSB7XG4gICAgICAgICAgICBpZigoKERhdGUubm93KCkgLSB0aGlzLl9zdGFydFRpbWUpLzEwMDApID4gKHRoaXMuX3NwZWVkIC8gdGhpcy5fd2luZG93VGlja3MpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWUrKztcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2ZyYW1lID49IHRoaXMuX3dpbmRvd1RpY2tzKSB0aGlzLl9mcmFtZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9jdHguZHJhd0ltYWdlKHRoaXMuX3Nwcml0ZVNoZWV0LCB0aGlzLl93aW5kb3dQb3NpdGlvbi54ICsgKHRoaXMuX2ZyYW1lICogdGhpcy5fd2luZG93U2l6ZS54KSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3dpbmRvd1Bvc2l0aW9uLnksIHRoaXMuX3dpbmRvd1NpemUueCwgdGhpcy5fd2luZG93U2l6ZS55LCB0aGlzLl9wb3NpdGlvbi54LCB0aGlzLl9wb3NpdGlvbi55LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaXplLngsIHRoaXMuX3NpemUueSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbmRlciB0ZXh0XG4gICAgICAgIGlmICh0aGlzLl90ZXh0ICE9IFwiXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dCh0aGlzLl90ZXh0LCB0aGlzLl9wb3NpdGlvbi54LCB0aGlzLl9wb3NpdGlvbi55LCB0aGlzLl9mb250U2l6ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE1vdmUgYW5pbWF0aW9uXG4gICAgICAgIGlmKE1hdGguYWJzKHRoaXMuX3Bvc2l0aW9uLnggLSB0aGlzLl9lbmRQb3NpdGlvbi54KSA+IHRoaXMuX3ZlbG9jaXR5LnggJiYgXG4gICAgICAgICAgICBNYXRoLmFicyh0aGlzLl9wb3NpdGlvbi55IC0gdGhpcy5fZW5kUG9zaXRpb24ueSkgPiB0aGlzLl92ZWxvY2l0eS55ICl7XG4gICAgICAgICAgICB0aGlzLl9wb3NpdGlvbi54ICs9IHRoaXMuX3ZlbG9jaXR5Lng7XG4gICAgICAgICAgICB0aGlzLl9wb3NpdGlvbi55ICs9IHRoaXMuX3ZlbG9jaXR5Lnk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgTW92ZU9iamVjdChlbmRQb3NpdGlvbiA6IFZlY3Rvciwgc3BlZWQgOiBudW1iZXIgPSAxKSA6IHZvaWQge1xuICAgICAgICBsZXQgZGlmWCA6IG51bWJlciA9IGVuZFBvc2l0aW9uLnggLSB0aGlzLl9wb3NpdGlvbi54O1xuICAgICAgICBsZXQgZGlmWSA6IG51bWJlciA9IGVuZFBvc2l0aW9uLnkgLSB0aGlzLl9wb3NpdGlvbi55O1xuICAgICAgICBsZXQgbWFnIDogbnVtYmVyID0gTWF0aC5zcXJ0KGRpZlgqZGlmWCArIGRpZlkqZGlmWSk7XG4gICAgICAgIHRoaXMuX3ZlbG9jaXR5ID0gbmV3IFZlY3RvcigoZGlmWCAvIG1hZykqc3BlZWQsIChkaWZZIC8gbWFnKSpzcGVlZClcbiAgICAgICAgdGhpcy5fZW5kUG9zaXRpb24gPSBlbmRQb3NpdGlvbjsgIFxuICAgIH1cbn1cblxuZXhwb3J0IHsgUmVuZGVyIH0iLCJpbXBvcnQgeyBDYW52YXMgfSBmcm9tIFwiLi9DYW52YXNcIjtcbmltcG9ydCB7IFJlbmRlciB9IGZyb20gXCIuL1JlbmRlclwiO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9WZWN0b3JcIjtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+e1xuICAgIGxldCBjYW52YXMgPSBuZXcgQ2FudmFzKCk7XG4gICAgaWYoY2FudmFzLkN0eCA9PSBudWxsKSByZXR1cm47XG5cbiAgICBsZXQgcGxhbmV0UmVuZGVyID0gbmV3IFJlbmRlcihjYW52YXMuQ3R4LCBuZXcgVmVjdG9yKDEwMCwgMTAwKSwgbmV3IFZlY3RvcigxMDAsIDEwMCksIFwiLi9Db250ZW50L3BsYW5ldFRlc3QucG5nXCIpXG4gICAgbGV0IHN0YXRpY1BsYW5ldCA9IG5ldyBSZW5kZXIoY2FudmFzLkN0eCwgbmV3IFZlY3RvcigzMDAsIDMwMCksIG5ldyBWZWN0b3IoMTAwLCAxMDApLCBcIi4vQ29udGVudC9zaW5nbGVQbGFuZXRUZXN0LnBuZ1wiKVxuICAgIHBsYW5ldFJlbmRlci5TZXRBbmltYXRpb25GcmFtZShuZXcgVmVjdG9yKDAsMCksIG5ldyBWZWN0b3IoMTAwLCAxMDApLCA1MCwgMTApXG4gICAgc3RhdGljUGxhbmV0Lk1vdmVPYmplY3QobmV3IFZlY3RvcigyMDAsIDIwMCkpXG5cbiAgICBsZXQgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgICBjYW52YXMuQ2xlYXIoKTtcblxuICAgICAgICBzdGF0aWNQbGFuZXQuTW92ZU9iamVjdChuZXcgVmVjdG9yKDEwMDAsIDUwMCksIDEpXG4gICAgICAgIFxuICAgICAgICBzdGF0aWNQbGFuZXQuRHJhdygpXG4gICAgICAgIHBsYW5ldFJlbmRlci5EcmF3KClcblxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgfVxuICAgIHJlbmRlcigpO1xufSIsImNsYXNzIFZlY3RvciB7XG4gICAgcHVibGljIHggOiBudW1iZXI7XG4gICAgcHVibGljIHkgOiBudW1iZXJcblxuICAgIGNvbnN0cnVjdG9yKHggOiBudW1iZXIsIHkgOiBudW1iZXIpe1xuICAgICAgICB0aGlzLnggPSB4XG4gICAgICAgIHRoaXMueSA9IHlcbiAgICB9XG59XG5cbmV4cG9ydCB7IFZlY3RvciB9Il19
