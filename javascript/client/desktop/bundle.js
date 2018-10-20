(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var planet_1 = require("../../shared/planet");
var testPlanet = new planet_1.Planet("Mars-Desktop");
console.log(testPlanet.name);

},{"../../shared/planet":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Test
var Planet = /** @class */ (function () {
    function Planet(n) {
        this.name = n;
    }
    Planet.prototype.toString = function () {
        return this.name + ";";
    };
    return Planet;
}());
exports.Planet = Planet;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0eXBlc2NyaXB0L2NsaWVudC9kZXNrdG9wL21haW4udHMiLCJ0eXBlc2NyaXB0L3NoYXJlZC9wbGFuZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLDhDQUE2QztBQUU3QyxJQUFJLFVBQVUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7QUNIN0IsTUFBTTtBQUNOO0lBR0ksZ0JBQVksQ0FBUztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBRU0seUJBQVEsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksR0FBQyxHQUFHLENBQUM7SUFDekIsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQVZBLEFBVUMsSUFBQTtBQUVNLHdCQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgUGxhbmV0IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9wbGFuZXRcIjtcblxubGV0IHRlc3RQbGFuZXQgPSBuZXcgUGxhbmV0KFwiTWFycy1EZXNrdG9wXCIpO1xuY29uc29sZS5sb2codGVzdFBsYW5ldC5uYW1lKTsiLCIvL1Rlc3RcbmNsYXNzIFBsYW5ldHtcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3Iobjogc3RyaW5nKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5ne1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lK1wiO1wiO1xuICAgIH1cbn1cblxuZXhwb3J0e1BsYW5ldH07Il19
