"use strict";
var Type;
(function (Type) {
    Type[Type["Labor"] = 1] = "Labor";
    Type[Type["Material"] = 2] = "Material";
    Type[Type["Millitary"] = 3] = "Millitary";
})(Type || (Type = {}));
var Link = /** @class */ (function () {
    function Link(f, t) {
        this.from = f;
        this.to = t;
    }
    return Link;
}());
