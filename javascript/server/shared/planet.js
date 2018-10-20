"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Focus;
(function (Focus) {
    Focus[Focus["Labor"] = 0] = "Labor";
    Focus[Focus["Material"] = 1] = "Material";
    Focus[Focus["Millitary"] = 2] = "Millitary";
})(Focus || (Focus = {}));
var Planet = /** @class */ (function () {
    function Planet(n, c, r, f) {
        this.name = n;
        this.carryingCapacity = c;
        this.reasourceDensity = r;
        this.focus = f;
    }
    Planet.prototype.toString = function () {
        return this.name + ";";
    };
    return Planet;
}());
exports.Planet = Planet;
