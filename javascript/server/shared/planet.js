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
