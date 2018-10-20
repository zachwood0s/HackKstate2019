(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var planet_1 = require("../../shared/planet");
var testPlanet = new planet_1.Planet("Mars-Desktop");
console.log(testPlanet.name);

},{"../../shared/planet":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0eXBlc2NyaXB0L2NsaWVudC9kZXNrdG9wL21haW4udHMiLCJ0eXBlc2NyaXB0L3NoYXJlZC9wbGFuZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLDhDQUE2QztBQUU3QyxJQUFJLFVBQVUsR0FBRyxJQUFJLGVBQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7QUNGN0I7SUFHSSxnQkFBWSxDQUFTO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTSx5QkFBUSxHQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQztJQUN6QixDQUFDO0lBQ0wsYUFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBRU0sd0JBQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBQbGFuZXQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3BsYW5ldFwiO1xuXG5sZXQgdGVzdFBsYW5ldCA9IG5ldyBQbGFuZXQoXCJNYXJzLURlc2t0b3BcIik7XG5jb25zb2xlLmxvZyh0ZXN0UGxhbmV0Lm5hbWUpOyIsIlxuY2xhc3MgUGxhbmV0e1xuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihuOiBzdHJpbmcpe1xuICAgICAgICB0aGlzLm5hbWUgPSBuO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmd7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUrXCI7XCI7XG4gICAgfVxufVxuXG5leHBvcnR7UGxhbmV0fTsiXX0=
