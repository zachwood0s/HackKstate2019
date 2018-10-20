(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./Canvas":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0eXBlc2NyaXB0L2NsaWVudC9kZXNrdG9wL0NhbnZhcy50cyIsInR5cGVzY3JpcHQvY2xpZW50L2Rlc2t0b3AvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7SUFPSTtRQUxPLFdBQU0sR0FBVyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3BDLFVBQUssR0FBVyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBS3JDLElBQUksQ0FBQyxNQUFNLEdBQXNCLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLHNCQUFLLEdBQVo7UUFDSSxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSTtZQUFFLE9BQU07UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBQ0wsYUFBQztBQUFELENBbEJBLEFBa0JDLElBQUE7QUFFUSx3QkFBTTs7Ozs7QUNwQmYsbUNBQWtDO0FBR2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDbkIsTUFBTSxDQUFDLE1BQU0sR0FBRztJQUNaLElBQUksTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7SUFDMUIsSUFBRyxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUk7UUFBRSxPQUFPO0lBQzlCLDJGQUEyRjtJQUUzRixJQUFJLE1BQU0sR0FBRztRQUNULE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUdmLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUE7SUFDRCxNQUFNLEVBQUUsQ0FBQztBQUNiLENBQUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNsYXNzIENhbnZhcyB7XG4gICAgcHVibGljIEN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgbnVsbDtcbiAgICBwdWJsaWMgSGVpZ2h0OiBudW1iZXIgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgcHVibGljIFdpZHRoOiBudW1iZXIgPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuICAgIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IDxIVE1MQ2FudmFzRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NyZWVuJyk7XG4gICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5XaWR0aDtcbiAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5IZWlnaHQ7XG4gICAgICAgIHRoaXMuQ3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIH1cblxuICAgIHB1YmxpYyBDbGVhcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuQ3R4ID09IG51bGwpIHJldHVyblxuICAgICAgICB0aGlzLkN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5XaWR0aCwgdGhpcy5IZWlnaHQpXG4gICAgfVxufVxuXG5leHBvcnQgeyBDYW52YXMgfSIsImltcG9ydCB7IENhbnZhcyB9IGZyb20gXCIuL0NhbnZhc1wiO1xuaW1wb3J0IHsgQW5pbWF0aW9uIH0gZnJvbSBcIi4vQW5pbWF0aW9uXCI7XG5cbmNvbnNvbGUubG9nKFwidGVzdFwiKVxud2luZG93Lm9ubG9hZCA9ICgpID0+e1xuICAgIGxldCBjYW52YXMgPSBuZXcgQ2FudmFzKCk7XG4gICAgaWYoY2FudmFzLkN0eCA9PSBudWxsKSByZXR1cm47XG4gICAgLy9sZXQgdGVzdEFuaW1hdGlvbiA9IG5ldyBBbmltYXRpb24oY2FudmFzLkN0eCwgXCIuL3Nwcml0ZVNoZWV0cy90ZXN0LnBuZ1wiLCAwLCAwLCA1NSwgNTUsIDkpXG5cbiAgICBsZXQgcmVuZGVyID0gKCkgPT4ge1xuICAgICAgICBjYW52YXMuQ2xlYXIoKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG4gICAgfVxuICAgIHJlbmRlcigpO1xufSJdfQ==
