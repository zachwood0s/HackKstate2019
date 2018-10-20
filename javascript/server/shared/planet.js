"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Focus;
(function (Focus) {
    Focus[Focus["Unfocused"] = 0] = "Unfocused";
    Focus[Focus["Labor"] = 1] = "Labor";
    Focus[Focus["Material"] = 2] = "Material";
    Focus[Focus["Millitary"] = 3] = "Millitary";
    Focus[Focus["Technology"] = 4] = "Technology";
})(Focus || (Focus = {}));
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["Labor"] = 0] = "Labor";
    ResourceType[ResourceType["Material"] = 1] = "Material";
    ResourceType[ResourceType["Millitary"] = 2] = "Millitary";
})(ResourceType || (ResourceType = {}));
var Buffer = /** @class */ (function () {
    function Buffer() {
        this.laborQuantity = [ResourceType.Labor, 0];
        this.materialsQuantity = [ResourceType.Material, 0];
        this.millitaryQuantity = [ResourceType.Millitary, 0];
    }
    return Buffer;
}());
var Planet = /** @class */ (function () {
    function Planet(n, c, r) {
        this.focus = Focus.Unfocused;
        this.inputs = [];
        this.outputs = [];
        this.owner = null;
        this.hovered = false;
        this.buffer = new Buffer();
        this.name = n;
        this.carryingCapacity = c;
        this.reasourceDensity = r;
    }
    Planet.prototype.toString = function () {
        return this.name + ";";
    };
    return Planet;
}());
exports.Planet = Planet;
